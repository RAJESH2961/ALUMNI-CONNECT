# ai/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import openai

# Initialize client
client = openai.OpenAI(
    # api_key="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",   # replace with env var in production
    base_url="https://api.groq.com/openai/v1"
)


# ai/views.py

# ai/views.py

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_bio(request):
    user = request.user
    profile = getattr(user, "profile", None)

    context = f"""
    Write a professional alumni profile bio in **first person** (using "I" not "He/She").
    Focus on career, achievements, and skills relevant to my background.
    Add 2–3 key skills naturally, based on my school and specialization.
    Keep it concise (3–4 sentences max).
    Do NOT start with phrases like "Here is a bio:" or "Here's a short bio:".
    
    My details:
    - Name: {user.first_name} {user.last_name}
    - Role: {profile.role if profile else ""}
    - School: {profile.school if profile else ""}
    - Specialization: {profile.specialization if profile else ""}
    - Batch Year: {profile.batch_year if profile else ""}
    """

    try:
        response = client.responses.create(
            model="llama-3.3-70b-versatile",
            input=context,
            max_output_tokens=150,
        )

        bio = response.output_text.strip()

        # Clean up unwanted intros if AI still adds them
        cleanup_phrases = [
            "here's a short bio",
            "here is a short bio",
            "here's a bio",
            "here is a bio"
        ]
        for phrase in cleanup_phrases:
            if bio.lower().startswith(phrase):
                bio = bio[len(phrase):].strip()
                break

        return Response({"bio": bio}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
