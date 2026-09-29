import time

cache = {}

CACHE_TTL = 300  # 5 minutes


def get_cache(key):
    if key not in cache:
        return None

    value, timestamp = cache[key]

    if time.time() - timestamp > CACHE_TTL:
        del cache[key]
        return None

    return value


def set_cache(key, value):
    cache[key] = (value, time.time())