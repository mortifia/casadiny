<template>
    <Header />
    <h1>Connection</h1>
    <form action="http://api.casadiny.com/auth/sign-in" method="post">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Sign-in" />
    </form>
</template>