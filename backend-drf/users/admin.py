from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Show in user list
    list_display = ('email', 'username', 'role', 'is_staff', 'is_active')

    # Fields shown in detail view (exclude non-editable fields)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal Info', {'fields': ('role', 'school', 'specialization', 'batch_year')}),
        ('Profile', {'fields': ('bio', 'profile_image', 'linkedin_url', 'github_url')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        # DO NOT add 'date_joined' here
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_active', 'is_staff')}
        ),
    )

    search_fields = ('email', 'username')
    ordering = ('email',)
