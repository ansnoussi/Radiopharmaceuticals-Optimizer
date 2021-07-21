import os
import datetime
from redis import Redis
from flask import Flask, render_template_string, request, session, redirect, url_for
from flask_session import Session



# Create the Flask application
app = Flask(__name__)

# Details on the Secret Key: https://flask.palletsprojects.com/en/1.1.x/config/#SECRET_KEY
# NOTE: The secret key is used to cryptographically-sign the cookies used for storing
#       the session identifier.
app.secret_key = os.environ.get("SECRET_KEY")

# Configure Redis for storing the session data on the server-side
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = Redis(host=os.environ.get("REDIS_HOST"), port=6379)


# Create and initialize the Flask-Session object AFTER `app` has been configured
server_session = Session(app)


@app.route('/api/ping')
def ping_pong():
    return 'pong'


@app.route('/api/session', methods=['GET', 'POST', 'DELETE'])
def session_utils():
    if request.method == 'POST':
        try:
            rp_settings = request.get_json()

            session["rp_activity"] = rp_settings['rp_activity']
            session["rp_half_life"] = rp_settings['rp_half_life']
            session["mesure_time"] = rp_settings['mesure_time']
            session["first_inj_time"] = rp_settings['first_inj_time']
            session["rp_vol"] = rp_settings['rp_vol']
            session["wasted_vol"] = rp_settings['wasted_vol']
            session["unextractable_vol"] = rp_settings['unextractable_vol']

            return 'Session initialised.'

        except Exception as e:
            #Clear the session
            session.pop('rp_activity', default=None)
            session.pop('rp_half_life', default=None)
            session.pop('mesure_time', default=None)
            session.pop('first_inj_time', default=None)
            session.pop('rp_vol', default=None)
            session.pop('wasted_vol', default=None)
            session.pop('unextractable_vol', default=None)

            return 'yo! be careful.'

    elif request.method == 'DELETE':
        
        session.pop('rp_activity', default=None)
        session.pop('rp_half_life', default=None)
        session.pop('mesure_time', default=None)
        session.pop('first_inj_time', default=None)
        session.pop('rp_vol', default=None)
        session.pop('wasted_vol', default=None)
        session.pop('unextractable_vol', default=None)

        return 'Session deleted.'


    else :
        # check if session is set
        if not session.get('mesure_time') :
            return 'Please initialise the session.'
        
        # Session is set, so we return measure time.
        mesure_time = session["mesure_time"]
        date = datetime.datetime.fromtimestamp(mesure_time / 1e3)

        # return the measure time for this session
        return "Current measure time : {}".format(str(date))




if __name__ == '__main__':
    app.run( host="0.0.0.0" , port=5000 )