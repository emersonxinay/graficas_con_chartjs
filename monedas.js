
// const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
// const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

async function mostrarapi() {
  try {
    const respondeapi = await fetch("https://mindicador.cl/api/dolar")
    const convertir_json = await respondeapi.json();
    // console.log(convertir_json)
    // console.log(convertir_json.serie[0].valor)
    return convertir_json

  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Error dice que es de TypeError")

    }
    else if (error instanceof SyntaxError) {
      // console.log("Error de Syntaxis")
      const etiqueta = document.querySelector("#errores")
      etiqueta.innerHTML = ` Tienes un error de que no existe el url del API  `

    }
    else {
      console.log("ocurrio error con la API", error)

    }
  }

}
mostrarapi()

// obtener los datos para el eje x = fechas 
async function ejex_fechas() {
  try {
    const todo_api = await mostrarapi()
    const obtener_fechas = todo_api.serie.map(x => x.fecha).reverse()
    // console.log(obtener_fechas)
    return obtener_fechas
  } catch (error) {
    const etiqueta = document.querySelector("#errores")
    etiqueta.innerHTML = ` Tienes un error con la API `

  }

}
ejex_fechas()


// obtener los datos para el eje y = valor 
async function ejey_valor() {
  try {
    const todo_api1 = await mostrarapi()
    const obtener_valores = todo_api1.serie.map(y => y.valor)
    // console.log(obtener_valores)
    return obtener_valores
  } catch (error) {
    const etiqueta = document.querySelector("#errores")
    etiqueta.innerHTML = ` Tienes un error con la API `
  }

}
ejey_valor()

// crear la función para usar las coordenadas 
async function mostrarGrafica() {
  try {
    const xValues = await ejex_fechas()
    const yValues = await ejey_valor()
    const myChart = new Chart("grafica", {
      type: "line",
      data: {

        labels: xValues,
        datasets: [
          {
            data: yValues,
            label: "Precio dolar",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            lineTension: 0,
          }
        ]
      },
      options: {
        title: {
          legend: { display: false },
          display: true,
          text: "Precio dolar durante los últimos días"
        }
      }
    });

  } catch (error) {
    const etiqueta = document.querySelector("#errores")
    etiqueta.innerHTML = ` Tienes un error con la API `
  }

}

mostrarGrafica()



