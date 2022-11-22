import PocketBase from 'pocketbase';

export default async function Login(credentials) {
    const db = new PocketBase('http://127.0.0.1:8090');
    const authData = await db.collection('users').authWithPassword('YOUR_USERNAME_OR_EMAIL', '1234567890');

    // after the above you can also access the auth data from the authStore
    console.log(db.authStore.isValid);
    console.log(db.authStore.token);
    console.log(db.authStore.model.id);

    // "logout" the last authenticated model
    db.authStore.clear();
}