from .settings import *

# Use the dummy cache for testing to avoid memcached issues
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}