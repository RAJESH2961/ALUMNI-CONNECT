from django.conf import settings
from twilio.rest import Client

def send_sms(to, message):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    try:
        client.messages.create(
            body=message,
            from_=settings.TWILIO_PHONE_NUMBER,
            to=to
        )
        print(f"✅ SMS sent to {to}")
        return True
    except Exception as e:
        print(f"❌ Failed to send SMS to {to}: {e}")
        return False
