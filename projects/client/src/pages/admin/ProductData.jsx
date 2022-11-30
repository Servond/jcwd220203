import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  useDisclosure,
  FormErrorMessage,
  ModalOverlay,

} from "@chakra-ui/react";
import { axiosInstance } from "../../api/index";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ProductData = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [openedEdit, setOpenedEdit] = useState(null);
  const [images, setImages] = useState({});

  const fetchProductData = async () => {
    try {
      const productData = await axiosInstance.get("/product");
      setData(productData.data.data);
      // console.log(data)
      // console.warn("test")
      // console.warn(productData.data.data)
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchImages = async (id) => {
  //   try {
  //     const productDataImage = await axiosInstance.get(
  //       `/product/detail/images/${id}`
  //     );
  //     setImages(productDataImage.data.data);
  //     console.log(images);
  //     console.warn("test");
  //     setIsLoading(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      toast({ title: "Successfully deleted product", status: "success" });
      fetchProductData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderProductData = () => {
    return data.map((val) => {
      return (
        <Tr key={val.id.toString()}>
          <Td>{val.id.toString()}</Td>
          <Td>{val.nama || "null"}</Td>
          <Td>{val.deskripsi || "null"}</Td>
          <Td>{val.harga.toLocaleString("in-ID", { style: "currency", currency: "IDR"}) || "null"}</Td>
          <Td>
            <Box>
              <Box mb={"2"}>
                <Link to={`/product/detail/${val.id}`} >
                <Button
                  width={"100px"}
                  bgColor={"#0095DA"}
                  _hover={false}
                  color="white"
                  onClick={() => {}}
                >
                  Edit
                </Button>
                </Link>
              </Box>
              <Box>
                <Button
                  width={"100px"}
                  bgColor={"#F7931E"}
                  _hover={false}
                  color="white"
                  onClick={() => deleteBtnHandler(val)}
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

  const {
    isOpen: isOpenAddNewProduct,
    onOpen: onOpenAddNewProduct,
    onClose: onCloseAddNewProduct,
  } = useDisclosure()


  const formikAddProduct = useFormik({
    initialValues: {
      nama: "",
      deskripsi: "",
      harga: "",
    },
    onSubmit: async ({
      nama,
      deskripsi,
      harga,
    }) => {
      try {
        const response = await axiosInstance.post("/product/", {
          nama,
          deskripsi,
          harga,
        })
        toast({
          title: "Registration Success",
          description: response.data.message,
          status: "success",
        })
        formikAddProduct.setFieldValue("nama", "")
        formikAddProduct.setFieldValue("deskripsi", "")
        formikAddProduct.setFieldValue("harga", "")
        fetchProductData()
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
      nama: Yup.string().required().min(3),
      deskripsi: Yup.string().required().min(3),
      harga: Yup.number().required().min(3),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formikAddProduct.setFieldValue(name, value)
  }


  const editFormik = useFormik({
    initialValues: {
      nama: "",
      deskripsi: "",
      harga: "",
    },
    onSubmit: async (values) => {
      try {
        let editedWarehouse = {
          nama: values.nama,
          deskripsi: values.deskripsi,
          harga: values.harga
          // UserId: values.UserId,
        };

        await axiosInstance.patch(
          `/warehouse/${openedEdit.id}`,
          editedWarehouse
        );

        toast({ title: "Warehouse edited", status: "success" });
        editFormik.setFieldValue("nama", "");
        editFormik.setFieldValue("deskripsi", "");
        editFormik.setFieldValue("harga", "");
        fetchProductData();
        setOpenedEdit(null);
      } catch (err) {
        console.log(err);
        toast({ title: "Server error while editing", status: "error" });
      }
    },
    validationSchema: Yup.object({
      nama: Yup.string().required().min(3),
      deskripsi: Yup.string().required().min(3),
      harga: Yup.number().required().min(3),
      // UserId: Yup.number().required(),
    }),
    validateOnChange: false,
  });

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target;
    editFormik.setFieldValue(name, value);
  };

  //Carousel
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchProductData();
  }, [openedEdit, images, data]);

  useEffect(() => {
    // console.log(openedEdit.id)
    if (openedEdit) {
      // fetchImages(openedEdit.id);
      console.log(openedEdit.id);
      editFormik.setFieldValue("nama", openedEdit.nama);
      editFormik.setFieldValue("deskripsi", openedEdit.deskripsi);
      editFormik.setFieldValue("harga", openedEdit.harga);
    }
  }, [openedEdit]);

  return (
    <>
      <Box marginLeft="250px" marginTop="65px">
        <HStack justifyContent="space-between">
        <Text fontSize={"2xl"} fontWeight="bold" color={"#F7931E"}>
          Product Data
        </Text>

        <Button
          bgColor={"#0095DA"}
          color="white"
          _hover={false}
          onClick={onOpenAddNewProduct}
        >
          Add New Product
        </Button>
        </HStack>
      
      <Table>
        <Thead>
          <Tr>
            <Th w="10px">ID</Th>
            {/* <Th w="100px">Photo Profile</Th> */}
            <Th w="150px">Name</Th>
            <Th w="450px">Description</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>{isLoading && renderProductData()}</Tbody>
      </Table>
      </Box>

      {/* Modal Add New Admin */}
      <Modal
        isOpen={isOpenAddNewProduct}
        onClose={onCloseAddNewProduct}
        motionPreset="slideInBottom"
        size={"md"}
      >
        <form onSubmit={formikAddProduct.handleSubmit}>
          <ModalOverlay />
          <ModalContent bgColor={"#0095DA"} color="white" p="20px">
            <ModalHeader fontSize={"2xl"} fontWeight="bold">
              New Product
            </ModalHeader>

            <ModalBody>
              <FormLabel>Name</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.nama}>
                <Input
                  value={formikAddProduct.values.nama}
                  name="nama"
                  type="text"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formikAddProduct.errors.nama}
                </FormErrorMessage>
              </FormControl>

              <FormLabel mt={"15px"}>Description</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.deskripsi}>
                <Input
                  value={formikAddProduct.values.deskripsi}
                  name="deskripsi"
                  onChange={formChangeHandler}
                  //
                />
                <FormErrorMessage>
                  {formikAddProduct.errors.deskripsi}
                </FormErrorMessage>
              </FormControl>

              <FormLabel mt={"15px"}>Price</FormLabel>
              <FormControl isInvalid={formikAddProduct.errors.harga}>
                <Input
                  value={formikAddProduct.values.harga}
                  name="harga"
                  onChange={formChangeHandler}
                  //
                />
                <FormErrorMessage>
                  {formikAddProduct.errors.harga}
                </FormErrorMessage>
              </FormControl>

              {/* <FormLabel mt={"15px"}>Product Picture</FormLabel>
              <FormControl isInvalid={formikAddNewAdmin.errors.img_url}>
                  <Input
                    value={formikAddNewAdmin.values.img_url}
                    name="img_url"
                    type="tel"
                    onChange={formChangeHandler}
                  />
                <FormErrorMessage>
                  {formikAddNewAdmin.errors.img_url}
                </FormErrorMessage>
              </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onCloseAddNewProduct}>
                Cancel
              </Button>
              <Button colorScheme="green" mr={3} onClick={formikAddProduct.handleSubmit}>
                Add New Product
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>


      {/* Modal edit */}
      <Modal isOpen={openedEdit} onClose={() => setOpenedEdit(null)}>
        <ModalContent bgColor="#0095DA" color="white">
          <ModalHeader>Editing Product Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Box>
                <div className="carousel">
                  <Slider {...settings}>
                    {/* {isLoading && renderImages()} */}
                  </Slider>
                  <Text> Images </Text>
                </div>
              </Box>
              <Box>
                <FormControl isInvalid={editFormik.errors.nama}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    name="nama"
                    type={"text"}
                    onChange={editFormChangeHandler}
                    value={editFormik.values.nama}
                  />
                </FormControl>
                <FormControl isInvalid={editFormik.errors.deskripsi}>
                  <FormLabel>Description</FormLabel>
                  <Input
                    name="deskripsi"
                    type={"text"}
                    onChange={editFormChangeHandler}
                    value={editFormik.values.deskripsi}
                  />
                </FormControl>
                <FormControl isInvalid={editFormik.errors.harga}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="harga"
                    type={"text"}
                    onChange={editFormChangeHandler}
                    value={editFormik.values.harga}
                  />
                </FormControl>
              </Box>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setOpenedEdit(null)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => editFormik.handleSubmit()}
              type="submit"
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductData;
