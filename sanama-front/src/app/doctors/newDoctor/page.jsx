"use client"
import React, { useEffect, useState } from 'react'
import { TextInput } from "flowbite-react"
import DatePicker from "@/components/Date/DatePicker"
import Picker from "@/components/buttons/Picker"
import Dropdown from "@/components/Dropdowns/Dropdown"
import { doctorService } from '@/services/doctorService'
import { es } from 'date-fns/locale'
import swal from "sweetalert"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { MdArrowBack } from 'react-icons/md';
const NewDoctor = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isFormEnabled, setIsFormEnabled] = useState(true)
  const [isNextPart, setIsNextPart] = useState(false)
  const [cancelButton, setCancelButton] = useState(false)
  const [imagenPerfil, setImagenPerfil] = useState(null)
  // Estados para campos del médico
  const [nombreMedico, setNombreMedico] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [dni, setDni] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [sexo, setSexo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [area, setArea] = useState('')
  const [cmp, setCmp] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [especialidades, setEspecialidades] = useState([])
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
  }, [])

  const handleImagenChange = (event) => {

    const file = event.target.files[0]
    // Obtener el nombre del archivo
    const fileName = file.name
    // Obtener la extensión del archivo
    const fileExtension = fileName.split('.').pop().toLowerCase();;
    if (fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "jpg") {

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagenPerfil(reader.result)
        }
        reader.readAsDataURL(file)
      }
    } else {
      toast.error(`No se permite imagen con extensión .${fileExtension}. Por favor usar imágenes con extensión .jpg, .jpeg o .png.`)
    }

  }

  const handleRegister = () => {
    // Lógica para el botón "Nuevo médico"
    // ...
  }

  const handleMedicoSelect = (selectedMedico) => {
    // Lógica para manejar la selección de un médico
    // ...
  }

  const validateTextInput = (target) => {
    // Lógica de validación para campos de texto
    // ...
  }

  const validateNumberInput = (target) => {
    // Lógica de validación para campos numéricos
    // ...
  }

  const handleCancel = () => {
    // Lógica para el botón "Cancelar"
    // ...
  }

  const handleSave = () => {
    swal({
      title: "Confirmar",
      text: "¿Confirmar registro de nuevo médico?",
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
        })
        const partes = imagenPerfil.split("data:image/")[1].split(";base64,")
        const extension = partes[0] // Aquí obtendrás la extensión de la imagen (por ejemplo, 'jpeg', 'png', etc.)
        const base64Data = partes[1] // Aquí obtendrás los datos en formato base64
        const url = 'http://localhost:8080/rrhh/post/registrarMedico'

        const data = {
          nombres: nombreMedico,
          apellidoPaterno: apellidoPaterno,
          apellidoMaterno: apellidoMaterno,
          dni: dni,
          fechaNacimiento: fechaNacimiento,
          sexo: sexo,
          telefono: telefono,
          correoElectronico: correo,
          area: area,
          cmp: cmp,
          especialidad: {
            idEspecialidad: especialidad, // Cambia esto según el valor correcto
          },
          foto: base64Data, // Puedes manejar la lógica para la foto aquí si es necesario
        }
        if (sexo.toLowerCase() === 'masculino') {
          // Si la cadena es "Masculino", guarda "M"
          data.sexo = 'M'
        } else if (sexo.toLowerCase() === 'femenino') {
          // Si la cadena es "Femenino", guarda "F"
          data.sexo = 'F'
        } else {
          // Puedes manejar otro caso si es necesario o dejarlo como está
          console.error('Valor de sexo no reconocido:', sexo)
          return // Puedes decidir qué hacer en este caso, por ejemplo, salir de la función
        }
        console.log("e", data)
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          swal.close()
          swal({ text: "El registro se realizó con éxito", icon: "success", timer: "2500" })
          router.push('/doctors')
          //return response.json();
        })
          .then(responseData => {
            // Manejar la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', responseData)
          })
          .catch(error => {
            // Manejar errores de la red u otros errores
            console.error('Error al enviar los datos:', error)
          })
      }
    })
  }


  const validateForm = () => {
    // Lógica para validar el formulario antes de pasar a la siguiente parte
    // ...
  }

  return (
    <section className="rounded-lg p-8 w-full flex flex-col space-y-6">


      {/* <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button
          className="w-[180px] text-center font-bold text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-4"
          style={{ marginLeft: 'auto' }}
          onClick={()=> router.back()}
        >
          Volver
        </button>
      </div> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h2 className="font-sans font-bold break-normal text-gray-700 text-2xl">Crear perfil de doctor</h2>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
          onClick={()=> router.back()}
        >
          <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
          Volver
        </button>
      </div>

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
                validateTextInput(event.target)
                setNombreMedico(event.target.value)
              }}
              required
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
              required
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
                validateTextInput(event.target)
                setApellidoPaterno(event.target.value)
              }}
              required
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
                validateTextInput(event.target)
                setApellidoMaterno(event.target.value)
              }}
              required
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
                validateTextInput(event.target)
                setDni(event.target.value)
              }}
              required
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
                validateNumberInput(event.target)
                setTelefono(event.target.value)
              }}
              required
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <DatePicker
              name={"fecha-nacimiento-medico"}
              value={fechaNacimiento}
              setValue={setFechaNacimiento}
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
            />
          </div>
          <div className="relative w-full group">
            <label className="text-gray-500 m-4">
              Elegir género
            </label>
            <Picker
              name1={"masculino"}
              name2={"femenino"}
              option1={"Masculino"}
              option2={"Femenino"}
              value={sexo}
              setValue={setSexo}
            />
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
  )
}

export default NewDoctor
