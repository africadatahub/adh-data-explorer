from flask import Flask
import os
from dotenv import load_dotenv
from whitenoise import WhiteNoise

load_dotenv()

app = Flask(__name__)
app.wsgi_app = WhiteNoise(app.wsgi_app)
my_static_folders = (
    'scoda/static/public/',
    'scoda/static/dist/css/',
    'scoda/static/dist/img/',
    'scoda/static/dist/js/',
)
for static in my_static_folders:
    app.wsgi_app.add_files(static)

# disable on production when using white noise
# app = Flask( __name__, static_folder='static')

# setup configs
env = os.environ.get('FLASK_ENV', 'development')
app.config['ENV'] = env

def _load_flask_config(app, env):
    primary = 'config/%s.cfg' % env
    fallback = 'config/example.development.cfg' if env == 'development' else None
    try:
        app.config.from_pyfile(primary)
        return
    except OSError:
        if fallback is None:
            raise FileNotFoundError(
                "Unable to load {}. Set FLASK_ENV and provide the matching config file.".format(primary)
            )
    except SyntaxError:
        if fallback is None:
            raise
    app.config.from_pyfile(fallback)

_load_flask_config(app, env)

# CSRF protection
from flask_wtf.csrf import CsrfProtect

csrf = CsrfProtect(app)

# Database
from flask_sqlalchemy import SQLAlchemy

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
sentry_sdk.init(
    dsn=f"{app.config['SENTRY_DSN']}",
    integrations=[
        FlaskIntegration(),
    ],
    traces_sample_rate=app.config['SENTRY_SAMPLER'],
    environment=app.config['SENTRY_ENV']
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
)

# Mail
from flask_mail import Mail

mail = Mail(app)

from redis import Redis

# redis-py 5+ defaults to RESP3 (HELLO 3). Older Redis servers reject that
# command, which 500s every cache-backed explore request.
redisClient = Redis.from_url(app.config['REDIS_URL'], protocol=2)