export async function commonLoad({request}){

    // Extraer y transformar las cookies en un objeto
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(cookie => cookie.split('=')));
//   const cookies = Object.fromEntries(request.headers.get('cookie')?.split('; ').map(c => c.split('=')) || []);
  // Devuelve las cookies como parte del contexto de carga

   let cookieState = {};

    const allValuesUndefined = Object.values(cookies).every(value => value === undefined);
    if (allValuesUndefined) {
        console.log("undefined");
        cookieState = { exist: false ,cookie:cookies}
    }else{
        console.log("tiene algo")
        cookieState = { exist: true ,cookie:cookies }
    }

    return {
        cookieState
    };
    
}