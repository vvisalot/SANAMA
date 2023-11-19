"use client";
import React, { useEffect, useState } from 'react';
import { TextInput } from "flowbite-react"
import DatePicker from "@/components/buttons/DatePicker"
import Picker from "@/components/buttons/Picker"
import Dropdown from "@/components/Dropdowns/Dropdown"
import { doctorService } from '@/services/doctorService';
import { es, id } from 'date-fns/locale';
import swal from "sweetalert";
import { useRouter, useParams } from "next/navigation";
import { toast } from 'sonner';
const EditDoctorProfile = () => {
  const params = useParams();
  const idDoctor = params.idDoctor;
  const router = useRouter();
  const [cancelButton, setCancelButton] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  // Estados para campos del médico
  const [nombreMedico, setNombreMedico] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [area, setArea] = useState('');
  const [cmp, setCmp] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [especialidades, setEspecialidades] = useState([]);

  const [telefonoBack, setTelefonoBack] = useState(null);
  const [correoBack, setCorreoBack] = useState(null);
  const [fotoBack, setFotoBack] = useState(null);
  const fetchSpecialty = async () => {
    try {
      const data = await doctorService.listarEspecialidades()
      setEspecialidades(data)
    } catch (error) {
      console.log("No se pudo obtener el listado de especialidades")
    }
  }

  useEffect(() => {
    fetchSpecialty()
  }, []);

  const [dataDoctor, setDataDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await doctorService.buscarPorNombre(idDoctor);
        console.log("doc", data);
        if (data && data.length > 0) {
          setDataDoctor(data[0]);
          setNombreMedico(data[0].nombres);
          setApellidoPaterno(data[0].apellidoPaterno)
          setApellidoMaterno(data[0].apellidoMaterno)
          setCmp(data[0].cmp)
          setDni(data[0].dni)
          setCorreo(data[0].correoElectronico)
          setTelefono(data[0].telefono)
          setFechaNacimiento(data[0].fechaNacimiento)
          setArea(data[0].area)
          setEspecialidad(data[0].especialidad.idEspecialidad)
          if (data[0].sexo === "M") {
            setSexo("Masculino")
          } else {
            setSexo("Femenino")

          }
          
          setImagenPerfil(`data:image/png;base64,${data[0].foto}`) //hardcodeado. Falta guarda su extensión en la bbdd para que sea exacto.
          //por ahora el navegador sabe qué hacer para que se muestre la imagen, lo corrige
          //setImagenPerfil(data[0].foto)
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchData();
  }, []);


  const handleImagenChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // Obtener el nombre del archivo
    const fileName = file.name;
    // Obtener la extensión del archivo
    const fileExtension = fileName.split('.').pop().toLowerCase();;
    if (fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "jpg") {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          //Si la imagen no es jpg o png, no se permite
          const imageData = reader.result;
          // Verificar la extensión de la imagen
          // Es una imagen jpg o png, puedes procesarla

          setImagenPerfil(imageData);
        };
        reader.readAsDataURL(file);
      }
    } else {
      toast.error(`No se permite imagen con extensión .${fileExtension}. Por favor usar imágenes con extensión .jpg, .jpeg o .png.`)
    }

    //console.log("foto", imagenPerfil)
  };

  const handleRegister = () => {
    // Lógica para el botón "Nuevo médico"
    // ...
  };

  const handleMedicoSelect = (selectedMedico) => {
    // Lógica para manejar la selección de un médico
    // ...
  };

  const validateTextInput = (target) => {
    // Lógica de validación para campos de texto
    // ...
  };

  const validateNumberInput = (target) => {
    // Lógica de validación para campos numéricos
    // ...
  };

  const handleCancel = () => {
    // Lógica para el botón "Cancelar"
    // ...
  };

  function validarCorreoElectronico(correo) {
    // Patrón para validar dirección de correo electrónico
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return patronCorreo.test(correo);
  }
  function validarNumeroTelefono(numero) {
    // Patrón para validar número de teléfono (10 dígitos, opcionalmente con guiones, paréntesis y espacios)
    const patronTelefono = /^\d{9}$/;
  
    return patronTelefono.test(numero);
  }

  const handleSave = () => { //validar correo y teléfono
    let hayErrores = false;
    if(!validarNumeroTelefono(telefono)){
      toast.error("El teléfono debe tener 9 dígitos");
      hayErrores = true; 
    }
    if(!validarCorreoElectronico(correo)){
      toast.error("Por favor, ingrese un correo electrónico válido.");
      hayErrores = true; 
    }
    if(hayErrores) return;

    swal({
      title: "Confirmar",
      text: "¿Confirmar actualización de datos?",
      icon: "warning",
      buttons: ["No", "Sí"],
      showLoaderOnConfirm: true,
    }).then((respuesta) => {
      if (respuesta) {
        swal({
          title: "Espere...",
          buttons: {
            confirm: null,
            cancel: null,
          },
          closeOnClickOutside: false,
          closeOnEsc: false,
        });
        let base64Data;
        if (imagenPerfil) {
          console.log("da", imagenPerfil)
          const partes = imagenPerfil.split("data:image/")[1].split(";base64,");
          const extension = partes[0]; // Aquí obtendrás la extensión de la imagen (por ejemplo, 'jpeg', 'png', etc.)
          base64Data = partes[1]; // Aquí obtendrás los datos en formato base64
        } else {
          base64Data = null
        }

        const url = 'http://localhost:8080/rrhh/put/actualizarMedicoShort';

        const data = {
          idPersona: idDoctor,
          telefono: telefono,
          foto: base64Data,
          correoElectronico: correo
        };
        console.log("data", data);
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');

            }
            swal.close();
            swal({ text: "El registro se realizó con éxito", icon: "success", timer: "2500" });
            // router.push('/doctors');
            //return response.json();
          })
          .then(responseData => {
            // Manejar la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', responseData);
          })
          .catch(error => {
            // Manejar errores de la red u otros errores
            console.error('Error al enviar los datos:', error);
          });
      }
    })
  };


  const validateForm = () => {
    // Lógica para validar el formulario antes de pasar a la siguiente parte
    // ...
  };

  return (
    <div>
      {
        dataDoctor ? (


          <section className="rounded-lg p-8 w-full flex flex-col space-y-6">

            <h2 className="font-sans font-bold break-normal text-gray-700 text-2xl">Editar perfil de doctor</h2>
            <br />

            <div className='text-sm'>
              {/* Nuevo código */}
              <div className="relative z-0 mb-6 group text-center">
                <label htmlFor="imagenPerfil" className="text-gray-500">
                  Foto de perfil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="imagenPerfil"
                  onChange={handleImagenChange}
                  className="block py-2.5 px-0 mx-auto w-full max-w-[400px] text-gray-900 bg-transparent" // Agregamos mx-auto para centrar horizontalmente
                />
                {imagenPerfil && (
                  <div className="mt-2" style={{ maxWidth: '20rem', width: '100%', height: '20rem', position: 'relative', margin: 'auto' }}>
                    <img
                      src={imagenPerfil}
                      alt="Vista previa de la imagen"
                      className="object-cover w-full h-full rounded-full"
                      style={{ objectFit: 'cover', margin: 'auto' }} // Agregamos margin: 'auto' para centrar horizontalmente
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-6">

                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="nombreMedico" className="text-gray-500">
                    Nombres
                  </label>
                  <TextInput
                    type="text"
                    name="nombreMedico"
                    id="nombreMedico"
                    minLength={3}
                    maxLength={255}
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={nombreMedico}
                    onChange={(event) => {
                      validateTextInput(event.target);
                      setNombreMedico(event.target.value);
                    }}
                    disabled
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <label className="text-gray-500">
                    CMP
                  </label>
                  <TextInput
                    type="text"
                    name="cmp"
                    id="cmp"
                    autoComplete="off"
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={cmp}
                    onChange={(event) => setCmp(event.target.value)}
                    disabled
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="apellidoPaterno" className="text-gray-500">
                    Primer apellido
                  </label>
                  <TextInput
                    type="text"
                    name="apellidoPaterno"
                    id="apellidoPaterno"
                    minLength={3}
                    maxLength={255}
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={apellidoPaterno}
                    onChange={(event) => {
                      validateTextInput(event.target);
                      setApellidoPaterno(event.target.value);
                    }}
                    disabled
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="apellidoPaterno" className="text-gray-500">
                    Segundo apellido
                  </label>
                  <TextInput
                    type="text"
                    name="apellidoPaterno"
                    id="apellidoPaterno"
                    minLength={3}
                    maxLength={255}
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={apellidoMaterno}
                    onChange={(event) => {
                      validateTextInput(event.target);
                      setApellidoMaterno(event.target.value);
                    }}
                    disabled
                  />
                </div>

              </div>
              <div className="grid grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="dniMedico" className="text-gray-500">
                    DNI
                  </label>
                  <TextInput
                    type="text"
                    name="dni"
                    id="dniMedico"
                    minLength={3}
                    maxLength={255}
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={dni}
                    onChange={(event) => {
                      validateTextInput(event.target);
                      setDni(event.target.value);
                    }}
                    disabled
                  />
                </div>


                <div className="relative z-0 w-full mb-6 group">
                  <label className="text-gray-500">
                    Correo
                  </label>
                  <TextInput
                    type="text"
                    name="correo"
                    minLength={3}
                    maxLength={255}
                    id="correo"
                    autoComplete="off"
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    required
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-x-6">
                <div className="relative z-0 w-full mb-6 group">
                  <label className="text-gray-500">
                    Teléfono
                  </label>
                  <TextInput
                    type="text"
                    name="telefono"
                    minLength={3}
                    maxLength={9}
                    id="telefono"
                    autoComplete="off"
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                    placeholder=" "
                    value={telefono}
                    onChange={(event) => {
                      validateNumberInput(event.target);
                      setTelefono(event.target.value);
                    }}
                    required
                  />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <DatePicker
                    name={"fecha-nacimiento-medico"}
                    value={fechaNacimiento}
                    setValue={setFechaNacimiento}
                    disabled
                  />
                </div>

              </div>


              <div className="grid grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <label className="text-gray-500">
                    Área
                  </label>
                  <Dropdown
                    data={[{ descripcion: "Atencion Medica" }, { descripcion: "Laboratorio" }]}
                    name={"dropdown-area-medico"}
                    defaultText={"Elegir área del médico"}
                    text={"descripcion"}
                    defaultValue={""}
                    width={"w-fit"}
                    value={"descripcion"}
                    selectedValue={area}
                    handleChange={(event) => {
                      setArea(event.target.value)
                    }}
                    disabled
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <label className="text-gray-500">
                    Especialidad
                  </label>
                  <Dropdown
                    data={especialidades}
                    name={"dropdown-especialidad-medico"}
                    defaultText={"Elegir especialidad del médico"}
                    text={"nombre"}
                    defaultValue={""}
                    width={"w-fit"}
                    value={"codigo"}
                    selectedValue={especialidad}
                    handleChange={(event) => setEspecialidad(event.target.value)}
                    disabled
                  />
                </div>
                <div className="relative w-full group">
                  <label className="text-gray-500 m-4">
                    Elegir género
                  </label>
                  <div className="text-gray-500 m-4">
                    <span>{sexo}</span>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-2 md:gap-6">

              </div>

              <div className="flex flex-row-reverse">
                <button
                  type="button"
                  className="m-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg w-full sm:w-auto px-5 py-3 text-center"
                  onClick={handleSave}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="m-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg  w-full sm:w-auto px-5 py-3 text-center"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </section>
        ) : (
          <p>Cargando...</p>
        )
      }
    </div>
  );
};

export default EditDoctorProfile;
