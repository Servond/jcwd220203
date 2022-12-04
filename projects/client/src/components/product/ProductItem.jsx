import {
    Box,
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Select,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { createSearchParams, useNavigate } from "react-router-dom"
import { axiosInstance } from "../../api"

const ProductItem = ({ product_name, id, price, description }) => {
    const [productData, setProductData] = useState([])
    const [imageProduct, setImageProduct] = useState([])

    const navigate = useNavigate()

    const fetchProductById = async () => {
        try {
            const response = await axiosInstance.get(`/product`)
            setProductData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProductImage = async () => {
        try {
            const response = await axiosInstance.get(`/product/image/${id}`)
            setImageProduct(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const productBtnHandler = () => {
        // navigate({
        //     pathname: `/product/${id}`,
        //     state: {
        //         product_name,
        //         description,
        //         price,
        //     },
        // })
        // navigate({
        //     pathname: "/product",
        //     search: createSearchParams({
        //         product: `${id}/${product_name}`,
        //     }).toString(),
        // })
        navigate(`/product/${id}/${product_name}}`)
    }
    useEffect(() => {
        fetchProductById()
        fetchProductImage()
    }, [])
    return (
        <>
            <Box onClick={() => productBtnHandler()}>
                <Box
                    w="166px"
                    h="315px"
                    bgColor="white"
                    borderRadius="12px"
                    boxShadow="1px 1px 6px 1px #e0e0e0"
                    cursor="pointer"
                    // px="8px"
                    // pb="16px"
                >
                    {/* Image */}
                    <Image
                        h="200px"
                        w="100%"
                        objectFit="fill"
                        borderTopRadius="12px"
                        src={imageProduct?.image_url}
                    />
                    {/* Product Name */}
                    <Box h="70px">
                        <Text p="2" fontSize="14px">
                            {product_name}
                        </Text>
                    </Box>
                    {/* Price */}
                    <Text pl="2" fontWeight="bold" fontSize="14px">
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(price)}
                    </Text>
                    {/* Description */}
                    <Text p="2" fontSize="14px">
                        {description}
                    </Text>
                </Box>
            </Box>
        </>
    )
}

export default ProductItem
