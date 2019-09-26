  class AuthenticationService{
        registerSuccessfulLogin(username){
            sessionStorage.setItem('authenticatedUser',username)
        }
        logout(){
            sessionStorage.removeItem('authenticatedUser')
        }
        isUserLoggedIn() {
            let user = sessionStorage.getItem('authenticatedUser')
            if(user===null) return false
            return true
        }
        getLoggedUserName() {
            let user = sessionStorage.getItem('authenticatedUser')
            if(user===null) return ''
            return user
        }

}
export default new AuthenticationService()