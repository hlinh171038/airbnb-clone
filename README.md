6.login UI
    - create hook
    - component
    - wrap into layoyt
    - add opoen to navbar
    -component/ LoginModal
        - onSubmit
            -signIn from 'next-auth/react' (login suceess)
    -but you cant take info of login
        - actions/getCurrentUser.ts
            - use getServerSession to get session
            - check with user.prisma to get current user
    -layout 
        - use current user
        -signOut from 'next-auth/react

            



