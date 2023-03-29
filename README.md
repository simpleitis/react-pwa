To set up app in dev
1) Add the firebase configs in "firebase.js" and "firebase-messaging-sw.js"
2) npm install 
3) npm run buildnserve

To send push notification
1) Go to "progressive-web-app" project in firebase -> Firestore database -> "subscribers" collection -> Copy the token
2) Go to "Cloud Messaging" -> Create you first campaign -> Firebase notification messages -> Fill in the details of the notification -> Send Test message -> Paste the token id-> Test
