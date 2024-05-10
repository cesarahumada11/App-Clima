//Denaos
const ingresos = [];

const egresos = [];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};


let totalIngresos = () => {
  let totalIngresos = 0;
  for (const ingreso of ingresos) {
    totalIngresos += ingreso.valor;
  }
  return totalIngresos;
};


let totalEgresos = () => {
  let totalEgresos = 0;
  for (const egreso of egresos) {
    totalEgresos += egreso.valor;
  }
  return totalEgresos;
};


let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgrasos = totalEgresos() / totalIngresos();
  if (isNaN(porcentajeEgrasos)) porcentajeEgrasos = 0;

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgrasos);
  document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimunFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimunFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (const ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("ingreso__lista").innerHTML = ingresosHTML;
};
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
     <div class="elemento">
     <div class="elemento__descripcion">${ingreso.descripcion}</div>
     <div class="elemento__derecha">
         <div class="elemento__valor">+ ${formatoMoneda(ingreso.valor)}</div>
         <div class="elemento__eliminar">
             <button class="elemento__eliminar--btn">
                 <ion-icon name="close-circle-outline" 
                 onClick='eliminarIngreso(${ingreso.id})'></ion-icon>
             </button>
         </div>
     </div>
 </div>
     `;
  return ingresoHTML;
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id == id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (const egreso of egresos) {
    egresosHTML += crearEgresosHTML(egreso);
  }
  document.getElementById("egreso__lista").innerHTML = egresosHTML;
};

const crearEgresosHTML = (egreso) => {
  let egresosHTML = `
    <div class="elemento">
                <div class="elemento__descripcion">${egreso.descripcion}</div>
                <div class="elemento__derecha">
                    <div class="elemento__valor">- ${formatoMoneda(
                      egreso.valor
                    )}</div>
                    <div class="elemento__porcentaje">${formatoPorcentaje(
                      egreso.valor / totalEgresos()
                    )}</div>
                    <div class="elemento__eliminar">
                        <button class="elemento__eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onClick='eliminarEgreso(${egreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
    `;
  return egresosHTML;
};
const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id == id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};

const agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
};
