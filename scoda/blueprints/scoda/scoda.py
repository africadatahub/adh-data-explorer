from flask import render_template, Blueprint

SCODA = Blueprint('SCODA', __name__)


@SCODA.route('/home')
@SCODA.route('/')
def home():
    return render_template('home.html')
