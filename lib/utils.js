'use strict'

module.exports=(result) =>{
    switch (result['error']) {
    case 2:
        result['code']=503
        break
    case 3:
        result['code']=503
        break
    case 4:
        result['code']=500/*ou 401 ainda a debater: 401 porque seria um erro do lado do cliente
         pois tentou aceder a secções do programa cujo o mesmo não tem premissão.
         500 O cliente não tem forma de se autenticar porque não é esse o objectivo.
         Logo o problema é o server ter feito mal as configurações.*/ 
        break
    case 5:
        result['code']=500
        break
    case 6:
        result['code']=400
        break
    case 7:
        result['code']=500// ????? maybe
        break
    case 8:
        result['code']=502
        break
    case 9:
        result['code']=502
        break
    case 10:
        result['code']=502
        break
    case 11:
        result['code']=503
        break
    case 13:
        result['code']=500
        break
    case 16:
        result['code']=500
        break
    case 26:
        result['code']=500
        break
    case 29:
        result['code']=503
        break
    }
    return result

}
/*2 : Invalid service - This service does not exist
3 : Invalid Method - No method with that name in this package
4 : Authentication Failed - You do not have permissions to access the service
5 : Invalid format - This service doesn't exist in that format
6 : Invalid parameters - Your request is missing a required parameter
7 : Invalid resource specified
8 : Operation failed - Something else went wrong
9 : Invalid session key - Please re-authenticate
10 : Invalid API key - You must be granted a valid key by last.fm
11 : Service Offline - This service is temporarily offline. Try again later.
13 : Invalid method signature supplied
16 : There was a temporary error processing your request. Please try again
26 : Suspended API key - Access for your account has been suspended, please contact Last.fm
29 : Rate limit exceeded - Your IP has made too many requests in a short period*/