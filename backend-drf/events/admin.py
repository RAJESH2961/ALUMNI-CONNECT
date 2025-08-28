from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'creator', 'event_type', 'date', 'max_seats', 'seats_filled', 'is_full', 'created_at')
    list_filter = ('event_type', 'date')
    search_fields = ('title', 'description', 'creator__username')
    readonly_fields = ('created_at', 'seats_filled', 'is_full')

    def seats_filled(self, obj):
        return obj.registered_users.count()
    seats_filled.short_description = 'Seats Filled'

    def is_full(self, obj):
        return obj.is_full()
    is_full.boolean = True
    is_full.short_description = 'Full?'

admin.site.register(Event, EventAdmin)
