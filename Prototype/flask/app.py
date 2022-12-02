# The user details get print in the console.
# so you can do whatever you want to do instead
# of printing it

from flask import Flask, render_template, url_for, redirect, request, json, session
from authlib.integrations.flask_client import OAuth
import os

app = Flask(__name__)
app.secret_key = 'random string'
# from OpenSSL import SSL
# context = SSL.Context(SSL.PROTOCOL_TLSv1_2)
# context.use_privatekey_file('server.key')
# context.use_certificate_file('server.crt')   

'''
	Set SERVER_NAME to localhost as twitter callback
	url does not accept 127.0.0.1
	Tip : set callback origin(site) for facebook and twitter
	as http://domain.com (or use your domain name) as this provider
	don't accept 127.0.0.1 / localhost
'''

# app.config['SERVER_NAME'] = 'localhost:5000'
oauth = OAuth(app)

@app.route('/')
def index(): 
	return render_template('index.html')

@app.route('/hit')
def success():
	user = request.args['user']  # counterpart for url_for()
	user = session['user']   
	# user = request.json 
	return user

@app.route('/google/')
def google():
	# Google Oauth Config
	# Get client_id and client_secret from environment variables
	# For developement purpose you can directly put it here inside double quotes
	GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
	GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
	CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
	oauth.register(
		name='google',
		client_id='479306296760-0j32mioskk9o33ollkahqqsjcvuh0ph7.apps.googleusercontent.com',
		client_secret='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',
		server_metadata_url=CONF_URL,
		client_kwargs={
			'scope': 'openid email profile'
		}
	)
	
	# Redirect to google_auth function
	redirect_uri = url_for('google_auth', _external=True)
	return oauth.google.authorize_redirect(redirect_uri)

@app.route('/google/auth/')
def google_auth():
	token = oauth.google.authorize_access_token()
	user = json.dumps(token)
	print('token is ', token)
	# user = oauth.google.parse_id_token(token)
	# print(" Google User ", user)
	# return redirect('/hit')
	session['user'] = user
	return redirect(url_for('.success', user=user))

@app.route('/facebook/')
def facebook():

	# Facebook Oauth Config
	FACEBOOK_CLIENT_ID = os.environ.get('FACEBOOK_CLIENT_ID')
	FACEBOOK_CLIENT_SECRET = os.environ.get('FACEBOOK_CLIENT_SECRET')
	oauth.register(
		name='facebook',
		client_id='452845167009046',
		client_secret='41c38890a4ffecea3a8d923dc71c14c5',
		access_token_url='https://graph.facebook.com/oauth/access_token',
		access_token_params=None,
		authorize_url='https://www.facebook.com/dialog/oauth',
		authorize_params=None,
		api_base_url='https://graph.facebook.com/',
		client_kwargs={'scope': 'email'},
	)
	redirect_uri = url_for('facebook_auth', _external=True)
	return oauth.facebook.authorize_redirect(redirect_uri)

@app.route('/facebook/auth/')
def facebook_auth():
	token = oauth.facebook.authorize_access_token()
	resp = oauth.facebook.get(
		'https://graph.facebook.com/me?fields=id,name,email,picture{url}')
	profile = resp.json()
	print("Facebook User ", profile)
	return redirect('/')

if __name__ == "__main__":
    # context = ('local.crt', 'local.key')
    app.run(debug=True)

    # app.run(debug=True, ssl_context=context)
