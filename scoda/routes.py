from flask import redirect, render_template, request, url_for
from flask_wtf.csrf import CSRFError

from scoda.app import app
from scoda.blueprints import SCODA

app.register_blueprint(SCODA, url_prefix='/home')


@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    return app.send_static_file('public/sitemap.xml')


@app.route('/')
def home_public():
    return redirect(url_for('SCODA.home'))


@app.errorhandler(CSRFError)
def csrf_error(e):
    return render_template('errors/400.html', base=request.base_url), 400


@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404


@app.errorhandler(500)
def server_error(e):
    return render_template('errors/500.html'), 500
