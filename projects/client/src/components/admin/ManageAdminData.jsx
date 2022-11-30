import {
  Avatar,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import * as Yup from "yup"
import AddNewAdmin from "./AddNewAdmin"
import Alert from "../profile/Alert"
import EditAdmin from "./EditAdmin"

const ManageAdminData = () => {
  const [userData, setUserData] = useState([])
  const cancelRef = React.useRef()

  const toast = useToast()

  const {
    isOpen: isOpenAddNewAdmin,
    onOpen: onOpenAddNewAdmin,
    onClose: onCloseAddNewAdmin,
  } = useDisclosure()

  const { onOpen, isOpen, onClose } = useDisclosure()

  const {
    onOpen: onOpenAlert,
    isOpen: isOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const [openedEdit, setOpenedEdit] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  console.log(selectedImage)
  console.log(openedEdit?.profile_picture)
  const [deleteAlert, setDeleteAlert] = useState(null)

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/userData/getAllWarehouseAdmin")

      setUserData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderUser = () => {
    return userData.map((val) => {
      return (
        <Tr key={val.id.toString()}>
          <Td>{val.id.toString()}</Td>
          <Td>
            <Avatar
              size={"lg"}
              borderRadius={"0"}
              name={val.username}
              src={val.profile_picture}
            />
          </Td>
          <Td>{val.username || "null"}</Td>
          <Td>{val.email}</Td>
          <Td>{val.phone_number || "null"}</Td>
          <Td>{val.Role.role_name || "null"}</Td>
          <Td>{val.Warehouse?.nama_warehouse || "null "}</Td>
          <Td>
            <Box>
              <Box mb={"2"}>
                <Button
                  width={"100px"}
                  bgColor={"#0095DA"}
                  _hover={false}
                  color="white"
                  onClick={() => setOpenedEdit(val)}
                >
                  Edit
                </Button>
              </Box>
              <Box>
                <Button
                  width={"100px"}
                  bgColor={"#F7931E"}
                  _hover={false}
                  color="white"
                  onClick={() => setDeleteAlert(val)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Td>
        </Tr>
      )
    })
  }

  const formikAddNewAdmin = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone_number: "",
      username: "",
    },
    onSubmit: async ({
      email,
      password,
      phone_number,
      profile_picture,
      username,
    }) => {
      try {
        const adminData = new FormData()

        if (email) {
          adminData.append("email", email)
        }

        if (password) {
          adminData.append("password", password)
        }

        if (phone_number) {
          adminData.append("phone_number", phone_number)
        }

        if (profile_picture) {
          adminData.append("profile_picture", profile_picture)
        }

        if (username) {
          adminData.append("username", username)
        }

        const response = await axiosInstance.post(
          "/userData/addNewAdmin",
          adminData
        )
        toast({
          title: "Registration Success",
          description: response.data.message,
          status: "success",
        })
        formikAddNewAdmin.setFieldValue("email", "")
        formikAddNewAdmin.setFieldValue("password", "")
        formikAddNewAdmin.setFieldValue("phone_number", "")
        formikAddNewAdmin.setFieldValue("username", "")
        fetchUserData()
      } catch (error) {
        console.log(error.response)
        toast({
          title: "Registration Failed",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required(8)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      phone_number: Yup.string()
        .required(9)
        .matches(
          /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/,
          "Phone number must be valid"
        ),
      username: Yup.string().required(6),
    }),
    validateOnChange: false,
  })

  const editFormik = useFormik({
    initialValues: {
      phone_number: "",
      profile_picture: "",
      username: "",
    },
    onSubmit: async ({ email, phone_number, profile_picture, username }) => {
      try {
        const adminData = new FormData()

        if (email) {
          adminData.append("email", email)
        }

        if (phone_number) {
          adminData.append("phone_number", phone_number)
        }

        if (profile_picture) {
          adminData.append("profile_picture", profile_picture)
        }

        if (username) {
          adminData.append("username", username)
        }

        const response = await axiosInstance.patch(
          `/userData/editAdmin/${openedEdit.id}`,
          adminData
        )
        toast({
          title: "Admin Edited",
          description: response.data.message,
          status: "success",
        })

        editFormik.setFieldValue("phone_number", "")
        editFormik.setFieldValue("profile_picture", "")
        editFormik.setFieldValue("username", "")
        fetchUserData()
        setOpenedEdit(null)
      } catch (error) {
        console.log(error)
        toast({
          title: "Failed Edit Admin",
          description: error.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
      phone_number: Yup.number(),
      username: Yup.string(),
    }),
    validateOnChange: false,
  })

  const deleteAdminHandler = async (id) => {
    try {
      await axiosInstance.delete(`/userData/deleteAdmin/${id}`)

      fetchUserData()

      toast({
        title: "Admin Deleted",
        status: "info",
      })
    } catch (error) {
      console.log(error.response)
      toast({
        title: "Failed Delete Admin",
        description: error.response.data.message,
        status: "error",
      })
    }
  }

  const doubleOnClick = () => {
    onClose()
    onCloseAddNewAdmin()
    formikAddNewAdmin.handleSubmit()
  }

  const doubleOnClick1 = () => {
    editFormik.handleSubmit()
    onCloseAlert()
    setSelectedImage(null)
  }

  const doubleOnClick2 = () => {
    setDeleteAlert(null)
    deleteAdminHandler(deleteAlert.id)
  }

  useEffect(() => {
    fetchUserData()
  }, [openedEdit, deleteAlert, selectedImage])

  useEffect(() => {
    if (openedEdit) {
      editFormik.setFieldValue("email", openedEdit.email)
      editFormik.setFieldValue("phone_number", openedEdit.phone_number)
      editFormik.setFieldValue("profile_picture", openedEdit.profile_picture)
      editFormik.setFieldValue("username", openedEdit.username)
    }
  }, [openedEdit])
  return (
    <Box marginLeft={"230px"}>
      <Box p="20px 0" display={"flex"} justifyContent="space-between" mr="2">
        <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
          Admin Data
        </Text>

        <Button
          bgColor={"#0095DA"}
          color="white"
          _hover={false}
          onClick={onOpenAddNewAdmin}
        >
          Add New Admin
        </Button>
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th w="10px">ID</Th>
            <Th w="100px">Photo Profile</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Role</Th>
            <Th>Warehouse</Th>
            <Th>Option</Th>
          </Tr>
        </Thead>
        <Tbody>{renderUser()}</Tbody>
      </Table>

      {/* Alert Delete */}
      <Alert
        body={`Areyou sure to delete "${deleteAlert?.username}"`}
        cancelRef={cancelRef}
        color={"#0095DA"}
        header={"Delete Admin"}
        isOpen={deleteAlert}
        leftButton={"Cancel"}
        onClose={() => setDeleteAlert(null)}
        onSubmit={() => doubleOnClick2()}
        rightButton={"Delete"}
      />

      {/* Modal Add New Admin */}
      <AddNewAdmin
        formikAddNewAdmin={formikAddNewAdmin}
        isOpenAddNewAdmin={isOpenAddNewAdmin}
        onCloseAddNewAdmin={onCloseAddNewAdmin}
        header="Add New Addmin"
        onOpen={onOpen}
        color="#0095DA"
      />

      {/* Alert Add New Admin */}
      <Alert
        header={"Add New Admin"}
        body={"Is data that you entered is correct"}
        cancelRef={cancelRef}
        isOpen={isOpen}
        leftButton={"Cancel"}
        onClose={onClose}
        rightButton={"Add New Admin"}
        onSubmit={() => doubleOnClick()}
        color={"#0095DA"}
      />

      {/* Modal Edit Admin */}
      <EditAdmin
        editFormik={editFormik}
        isOpen={openedEdit}
        header={"Edit Admin"}
        onClose={() => setOpenedEdit(null)}
        color={"#0095DA"}
        onOpen={onOpenAlert}
        onCloseMod={() => setOpenedEdit(null)}
      />

      {/* Alert Edit admin */}
      <Alert
        body={"Is data that you entered correct?"}
        cancelRef={cancelRef}
        color={"#0095DA"}
        header={"Edit Admin"}
        isOpen={isOpenAlert}
        leftButton={"Cancel"}
        onClose={onCloseAlert}
        onSubmit={doubleOnClick1}
        rightButton={"Edit Admin"}
      />
    </Box>
  )
}
export default ManageAdminData
