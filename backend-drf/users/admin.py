from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ('email', 'username', 'role', 'is_active', 'is_approved', 'profile_completed')
    list_filter = ('is_active', 'is_approved', 'role')

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'role', 'school', 'specialization', 'batch_year', 'bio', 'profile_image', 'linkedin_url', 'github_url')}),
        ('Approval Info', {'fields': ('is_approved', 'profile_completed')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_approved'),
        }),
    )

    search_fields = ('email', 'username')
    ordering = ('email',)
