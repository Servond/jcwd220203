import {
  Box,
  Text,
  Stack,
  Image,
  Button,
  useNumberInput,
  Input,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  CircularProgress,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useSelector } from "react-redux"
import { MdModeEdit } from "react-icons/md"
import ResponsiveProductDetail from "./ResponsiveProdutcDetail"

const ProductDetail = ({ product_name, id }) => {
  const [productDetail, setProductDetail] = useState([])
  const [image, setImage] = useState([])
  const [stock, setStock] = useState([])
  const [productId, setProductId] = useState([])
  const [cartItemQuantity, setCartItemQuantity] = useState(null)
  const [addNote, setAddNote] = useState(false)
  const [inputNote, setInputNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const authSelector = useSelector((state) => state.auth)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const location = useLocation()

  const params = useParams()

  const fetchProductDetail = async () => {
    try {
      const response = await axiosInstance.get(`/product/${params.id}`)
      setProductDetail(response.data.data)
      setImage(response.data.data.Image_Urls)
      setProductId(response.data.data.id)

      const cartStock = response.data.data.Total_Stocks.map((val) => val.stock)

      let Total = 0

      for (let i = 0; i < cartStock.length; i++) {
        Total += Number(cartStock[i])
      }

      setStock(Total)
      setIsLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: stock,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const addQuantity = Number(input.value)

  const userMustLogin = () => {
    if (!authSelector.id) {
      onOpen()
    }
  }

  const fetchCartByProductId = async () => {
    try {
      const response = await axiosInstance.get(
        `/carts/cartBy/ProductId/${productId}`
      )

      if (response.data.data === null) {
        setCartItemQuantity(null)
      } else {
        setCartItemQuantity(response.data.data.quantity)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addToCart = async () => {
    try {
      let addToCart = {
        ProductId: productId,
        quantity: addQuantity,
        note: inputNote,
      }

      await axiosInstance.post("/carts", addToCart)

      toast({
        title: "Cart Items Added",
        status: "success",
      })

      fetchCartByProductId()
    } catch (err) {
      console.log(err)

      if (stock === 0) {
        toast({
          title: `Failed Added Cart Items`,
          status: "error",
          description: "Product out of stock",
        })
      } else {
        toast({
          title: `Failed Added Cart Items`,
          status: "error",
          description: err.response.data.message,
        })
      }
    }
  }

  const addToExistingCart = async () => {
    try {
      let newQuantity = {
        quantity: addQuantity,
        note: inputNote,
      }
      await axiosInstance.patch(`/carts/addCartItems/${productId}`, newQuantity)
      toast({
        title: "Cart Items Added",
        status: "success",
      })

      fetchCartByProductId()
    } catch (err) {
      console.log(err)

      const itemLeft = stock - cartItemQuantity

      if (stock === 0) {
        toast({
          title: `Failed Added Cart Items`,
          status: "error",
          description: "Product out of stock",
        })
      } else {
        toast({
          title: `Only ${itemLeft} left and you already have ${cartItemQuantity} of this item in your cart.`,
          status: "error",
          description: err.response.data.message,
        })
      }
    }
  }

  const cancelNotes = () => {
    setAddNote(false)
    setInputNote("")
  }

  useEffect(() => {
    fetchCartByProductId()
    fetchProductDetail()
  }, [cartItemQuantity, addQuantity, productDetail])
  return (
    <>
      <Box
        mx="auto"
        mt="120px"
        w="1150px"
        display={{ lg: "block", md: "none", base: "none" }}
      >
        {isLoading === false ? (
          <Box
            w={"1200px"}
            h={"400px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <CircularProgress
              isIndeterminate
              color="#0095DA"
              thickness="160px"
              size="100px"
            />
          </Box>
        ) : (
          <Box
            // border="1px solid brown"
            display="flex"
            gap="20px"
          >
            <Box
              // border="1px solid blue"
              borderRadius="12px"
              // boxShadow="1px 1px 6px 1px #e0e0e0"
              display="block"
              w="348px"
              h="420px"
            >
              <Carousel showStatus={false} showArrows={true}>
                {image.map((val) => (
                  <Stack>
                    <Box
                      // border="1px solid brown"
                      w="348px"
                      h="348px"
                      borderRadius="12px"
                      display="block"
                    >
                      <Image
                        src={val.image_url}
                        w="348px"
                        h="348px"
                        objectFit="cover"
                        borderRadius="12px"
                        // border="1px solid red"
                      />
                    </Box>
                  </Stack>
                ))}
              </Carousel>
            </Box>

            {/* Product */}
            <Box
              // border="1px solid green"
              borderRadius="12px"
              w="468px"
              h="700px"
              display="block"
              mx="auto"
            >
              <Box display="grid" gap="20px">
                {/* Product Name */}
                <Stack
                  // border="1px solid red"
                  w="468px"
                  h="48px"
                >
                  <Text fontSize="16" fontFamily="sans-serif" fontWeight="bold">
                    {productDetail?.product_name}
                  </Text>
                </Stack>

                {/* Price */}
                <Stack
                  // border="1px solid blue"
                  w="468px"
                  h="80px"
                  borderBottom="1px solid #dfe1e3"
                >
                  <Text fontSize="28" fontFamily="sans-serif" fontWeight="bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(productDetail.price)}
                  </Text>
                </Stack>

                {/* Description */}
                <Stack
                  // border="1px solid brown"
                  w="468px"
                  h="48px"
                >
                  <Text
                    fontSize="14"
                    fontFamily="sans-serif"
                    whiteSpace={"pre-line"}
                  >
                    {productDetail.description}
                  </Text>
                </Stack>
              </Box>
            </Box>

            {/* Add to cart */}
            <Box
              bgColor={"#fff"}
              right={"250px"}
              p={"16px 12px"}
              display="block"
              px="16px"
              w="268px"
              h={"100%"}
              boxShadow={"0 0 10px 0 rgb(0 0 0 / 10%) !important"}
              borderRadius={"15px"}
              border={"1px solid #99d5f0"}
            >
              <Box gap="20px">
                <Stack>
                  <Text
                    fontSize="16px"
                    fontWeight={700}
                    textAlign={"left"}
                    lineHeight={"22px"}
                    m={"4px 0px 20px"}
                    color={"#3135BF5"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                  >
                    Set amount and note
                  </Text>
                </Stack>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  boxSizing={"inherit"}
                  w={"242.03px"}
                  h={"27.97px"}
                >
                  {/* set amount */}
                  <Box
                    w={"104px"}
                    h={"28px"}
                    display={"flex"}
                    border={"1px solid #BFC9D9"}
                    borderRadius={"4px"}
                    p={"3px"}
                    alignItems={"center"}
                    _hover={{
                      borderColor: "#0095DA",
                    }}
                    justifyContent={"flex-start"}
                  >
                    <Box
                      maxW={"20px"}
                      maxH={"20px"}
                      minH={"20px"}
                      minW={"20px"}
                      w={"20px"}
                      h={"20px"}
                      p={"0px"}
                      color={addQuantity > 1 ? "#0095DA" : "#c0cada"}
                      {...dec}
                      isDisabled={stock === 0 ? true : false}
                      bgColor={"#fff"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      _hover={"none"}
                      _active={"none"}
                    >
                      <AiOutlineMinus
                        style={{
                          height: "16px",
                          width: "16px",
                        }}
                      />
                    </Box>
                    <Input
                      isDisabled={stock === 0 ? true : false}
                      minWidth={"56px"}
                      maxWidth={"56px"}
                      height={"20px"}
                      textAlign="center"
                      p={"1px"}
                      {...input}
                      fontFamily={
                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                      }
                      fontSize={"14px"}
                      lineHeight={"18px"}
                      color={"rgba(49,53,59,0.68)"}
                      borderColor={"#fff"}
                      _hover={"none"}
                      focusBorderColor={"#fff"}
                      type={"number"}
                    />
                    {stock === 0 ? (
                      <Box
                        maxW={"20px"}
                        maxH={"20px"}
                        minH={"20px"}
                        minW={"20px"}
                        w={"20px"}
                        h={"20px"}
                        p={"0px"}
                        color={stock <= addQuantity ? "#c0cada" : "#0095DA"}
                        isDisabled={stock !== 0 ? false : true}
                        bgColor={"#fff"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        _hover={"none"}
                        _active={"none"}
                      >
                        <AiOutlinePlus />
                      </Box>
                    ) : (
                      <Box
                        maxW={"20px"}
                        maxH={"20px"}
                        minH={"20px"}
                        minW={"20px"}
                        w={"20px"}
                        h={"20px"}
                        p={"0px"}
                        color={stock <= addQuantity ? "#c0cada" : "#0095DA"}
                        {...inc}
                        isDisabled={stock !== 0 ? false : true}
                        bgColor={"#fff"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        _hover={"none"}
                        _active={"none"}
                      >
                        <AiOutlinePlus />
                      </Box>
                    )}
                  </Box>
                  <Text
                    lineHeight={"20px"}
                    ml={"8px"}
                    fontSize={"14px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    color={"#31353BF5"}
                    fontWeight={500}
                  >
                    {`Total Stocks: `}
                    <Text
                      as={"span"}
                      fontWeight={"bolder"}
                      color={stock === 0 ? "#FF6577" : "#31353BF5"}
                    >
                      {stock}
                    </Text>
                  </Text>
                </Box>
                {addQuantity > stock ? (
                  <Text
                    fontSize={"12px"}
                    fontFamily={"Open Sauce One, sans-serif"}
                    color={"red"}
                    mt={"5px"}
                    letterSpacing={"0.5px"}
                    fontWeight={500}
                  >
                    Maximum Quantity to purchase this item is {stock}
                  </Text>
                ) : null}

                {/* add notes */}
                {stock === 0 ? null : (
                  <Box
                    mt={"16px"}
                    display={"flex"}
                    color={"#0095DA"}
                    gap={"2px"}
                  >
                    {addNote === true ? null : (
                      <>
                        <MdModeEdit />
                        <Text
                          onClick={() => setAddNote(true)}
                          fontSize={"12px"}
                          fontFamily={"Open Sauce One, sans-serif"}
                          fontWeight={"600"}
                          lineHeight={"1,4"}
                          cursor={"pointer"}
                          color={"#0095DA"}
                          flex-direction={"row"}
                        >
                          Add Notes
                        </Text>
                      </>
                    )}
                    {addNote === true ? (
                      <Box>
                        <Input
                          padding={"10px 16px"}
                          type={"text"}
                          onChange={(e) => setInputNote(e.target.value)}
                          value={inputNote}
                          _placeholder={{
                            color: "#c2c2c2",
                          }}
                          placeholder={"Example: white color, medium size"}
                          width={"234px"}
                          height={"40px"}
                          margin={"0px"}
                          border={"1px solid #ebedee"}
                          borderRadius={"8px"}
                          color={"#31353BF5"}
                          focusBorderColor={"#0095DA"}
                          fontFamily={"Open Sauce One, Nunito Sans, sans-serif"}
                          fontSize={"14px"}
                        />
                        <Text
                          onClick={cancelNotes}
                          fontSize={"12px"}
                          fontFamily={"Open Sauce One, sans-serif"}
                          fontWeight={"600"}
                          lineHeight={"1,4"}
                          cursor={"pointer"}
                          color={"#0095DA"}
                          p={"0px"}
                          display={"flex"}
                          alignItems={"center"}
                          margin={"8px 0px 0px"}
                        >
                          Cancel Notes
                        </Text>
                      </Box>
                    ) : null}
                  </Box>
                )}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  pb={"16px"}
                  mt={"18px"}
                >
                  <Text
                    color={"#31353BAD"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    fontSize={"14px"}
                    fontWeight={"400"}
                    lineHeight={"18px"}
                    marginTop={"4px"}
                  >
                    Subtotal
                  </Text>
                  <Text
                    color={"#31353BF5"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    fontSize={"18px"}
                    fontWeight={"bold"}
                    lineHeight={"26px"}
                    margin={"0px"}
                  >
                    {stock === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(productDetail.price * addQuantity)
                          .split(",")[0]}
                  </Text>
                </Box>

                {cartItemQuantity === null ? (
                  <Button
                    letterSpacing={"0px"}
                    borderRadius={"8px"}
                    bgColor="#F7931E"
                    color="white"
                    w={"100%"}
                    h={"40px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    margin={"8px 0px"}
                    padding={"0px 16px"}
                    fontWeight={700}
                    alignItems={"center"}
                    _hover={{
                      bgColor: "#B86401",
                    }}
                    _active={{
                      bgColor: "#B86401",
                    }}
                    onClick={authSelector.id ? addToCart : userMustLogin}
                    isDisabled={
                      addQuantity === null || addQuantity === 0 || stock === 0
                        ? true
                        : false
                    }
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    letterSpacing={"0px"}
                    borderRadius={"8px"}
                    bgColor="#F7931E"
                    color="white"
                    w={"100%"}
                    h={"40px"}
                    fontFamily={
                      "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                    }
                    margin={"8px 0px"}
                    padding={"0px 16px"}
                    fontWeight={700}
                    alignItems={"center"}
                    _hover={{
                      bgColor: "#B86401",
                    }}
                    _active={{
                      bgColor: "#B86401",
                    }}
                    onClick={
                      authSelector.id ? addToExistingCart : userMustLogin
                    }
                    isDisabled={
                      addQuantity === null || addQuantity === 0 || stock === 0
                        ? true
                        : false
                    }
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* if user not logged in */}
      <AlertDialog
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"sm"}
        closeOnEsc={false}
      >
        <AlertDialogOverlay
          bg="blackAlpha.400"
          backdropFilter="blur(50px) hue-rotate(90deg)"
        >
          <AlertDialogContent borderRadius={"30px"} mt={"-50px"}>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={"#F7931E"}
              pt={"20px"}
            >
              Notification!
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                boxSizing={"border-box"}
              >
                <Text
                  pb={"10px"}
                  fontFamily={
                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                  }
                  fontWeight={500}
                >
                  You must log in first before do any transaction
                </Text>
                <Link to={"/login"} replace state={{ from: location }}>
                  <Button
                    borderRadius={"20px"}
                    mt={"16px"}
                    width={"220px"}
                    colorScheme="blue"
                    onClick={() => onClose()}
                  >
                    OK
                  </Button>
                </Link>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter pb={"5px"}></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Reposive */}
      <ResponsiveProductDetail
        addToCart={addToCart}
        addToCartByProductId={addToExistingCart}
        cartItemQuantity={cartItemQuantity}
        addQuantity={addQuantity}
        stock={stock}
        userMustLogin={userMustLogin}
      />
    </>
  )
}

export default ProductDetail
