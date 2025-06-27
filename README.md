# About the app
This is basic app which check the credential against the Active directory from login page.  
Use this app to check if password is correct and working, or check if created user is actually authenticating.  

# Run npm install
npm init -y  
npm i  

# Create a .env file
example variables  
LDAP_URL = ldap://dc.contoso.com  
LDAP_BASEDN = 'dc=contoso,dc=com'  
LDAP_USERNAME= contoso\aduserxxx  
LDAP_PASSWORD= StrongP@55w0rd  

# Access the application  
http://localhost:3000  
