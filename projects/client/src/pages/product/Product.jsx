import {
    Box,
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Select,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import CategoryList from "../../components/product/CategoryList"
import ProductItem from "../../components/product/ProductItem"

const Product = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get(`/product`)
            setProducts(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get(`/product/category`)
            setCategory(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    const renderProduct = () => {
        return products.map((val) => {
            return (
                <ProductItem
                    key={val.id.toString()}
                    product_name={val.product_name}
                    description={val.description}
                    price={val.price}
                    category_name={val.category_name}
                    stock={val.stock}
                    image_url={val.image_url}
                    id={val.id}
                />
            )
        })
    }

    const renderCategory = () => {
        return category.map((val) => {
            return (
                <CategoryList
                    key={val.id.toString()}
                    category_name={val.category_name}
                />
            )
        })
    }

    useEffect(() => {
        fetchProduct()
        fetchCategory()
    }, [])
    return (
        <>
            <Box
                border="1px solid red"
                mx="auto"
                mt="90px"
                w="1100px"
                h="1600px"
                // p="10px 24px"
                display="block"
                borderBottom="1px solid #dfe1e3"
            >
                {/* Path history */}
                <Box
                    border="1px solid green"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    boxShadow="1px 1px 6px 1px #e0e0e0"
                    borderRadius="6px"
                    p="10px 0"
                    fontSize="14px"
                >
                    <Text>Product</Text>
                </Box>

                {/* Filter and Search */}
                <Box
                    border="1px solid blue"
                    marginBlockEnd="16px"
                    marginBlockStart="18px"
                    display="flex"
                    alignItems="center"
                >
                    <Spacer />
                    <HStack pr="5px">
                        <Text fontWeight="bold" fontSize="12px">
                            Sort:
                        </Text>
                    </HStack>
                    <HStack>
                        <Select>
                            <option value="option1">Option</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </HStack>
                </Box>

                {/* Content */}

                <Box border="1px solid brown" display="flex" gap="4px">
                    {/* Fitler */}
                    <Box
                        border="1px solid #dfe1e3"
                        borderRadius="12px"
                        boxShadow="1px 1px 6px 1px #e0e0e0"
                        display="block"
                        w="234px"
                        h="800px"
                        p="12px"
                    >
                        <Text fontSize="20px">Filter</Text>
                        <Box mt="20px" display="block">
                            <Text fontWeight="bold" fontSize="14px">
                                Categories
                            </Text>
                            {renderCategory()}
                        </Box>
                    </Box>

                    {/* Product */}
                    <Box
                        border="1px solid green"
                        borderRadius="12px"
                        w="912px"
                        h="1000px"
                        display="grid"
                    >
                        <GridItem>
                            <Grid
                                // border="1px solid green"
                                p="16px 0"
                                pl="16px"
                                // px="8px"
                                gap="4"
                                // cursor="pointer"
                                templateColumns="repeat(5,1fr)"
                            >
                                {renderProduct()}
                            </Grid>
                        </GridItem>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Product
