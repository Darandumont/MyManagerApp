export interface User{
    uid: string;//Id de usuario.
    displayName: string;//Nombre que se muestra.
    email: string;
    emailVerified: boolean;//Si el email está verificado o no.
}