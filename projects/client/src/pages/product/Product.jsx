import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    Checkbox,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Select,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState, useMemo } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { CgChevronLeft, CgChevronRight } from "react-icons/cg"
import { axiosInstance } from "../../api"
import CategoryList from "../../components/product/CategoryList"
import ProductItem from "../../components/product/ProductItem"
import Navbar from "../../components/Navbar"

const Product = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [sortBy, setSortBy] = useState("product_name")
    const [sortDir, setSortDir] = useState("ASC")
    const [filter, setFilter] = useState("All")
    const [searchProduct, setSearchProduct] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [searchParam, setSearchParam] = useSearchParams()

    const [catPage, setCatPage] = useState(1)
    const [catTotalCount, setCatTotalCount] = useState(0)

    const fetchProduct = async () => {
        const maxItemsPerPage = 10

        try {
            const response = await axiosInstance.get(`/product`, {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    _sortBy: sortBy,
                    _sortDir: sortDir,
                    CategoryId: filter,
                    product_name: searchValue,
                    category_name: searchValue,
                },
            })
            setTotalCount(response.data.dataCount)
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))

            if (page === 1) {
                setProducts(response.data.data)
            } else {
                setProducts(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get(`/product/category`, {
                params: {
                    _limit: 12,
                    _page: catPage,
                    _sortDir: "ASC",
                },
            })
            setCatTotalCount(response.data.dataCount)

            if (catPage === 1) {
                setCategory(response.data.data)
            } else {
                setCategory(response.data.data)
            }
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
                    // description={val.description}
                    price={val.price}
                    // category_name={val.category_name}
                    // stock={val.stock}
                    // image_url={val.image_url}
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
                    id={val.id}
                />
            )
        })
    }

    // Button Handler
    const sortBtnHandler = ({ target }) => {
        const { value } = target
        setSortBy(value.split(" ")[0])
        setSortDir(value.split(" ")[1])

        const params = {}
        if (searchParam.get("name")) {
            params["name"] = searchParam.get("name")
        }
        params[value.split(" ")[0]] = value.split(" ")[1]
        setSearchParam(params)
    }
    const filterBtnHandler = ({ target }) => {
        const { value } = target
        setFilter(value)
    }

    const nextPageBtnHandler = () => {
        setPage(page + 1)
    }

    const prevPageBtnHandler = () => {
        setPage(page - 1)
    }

    const searchBtnHandler = () => {
        setSearchValue(searchProduct)

        const params = {}
        params["name"] = searchProduct
        setSearchParam(params)
    }
    const handleKeyEnter = (e) => {
        if (e.key === "Enter") {
            setSearchValue(searchProduct)
        }
    }

    const seeMoreBtnHandler = () => {
        setCatPage(catPage + 1)
    }

    useEffect(() => {
        for (let entry of searchParam.entries()) {
            if (entry[0] === "name") {
                setSearchValue(entry[1])
            }
            if (entry[0] === "product_name" || entry[0] === "price") {
                setSortBy(entry[0])
                setSortDir(entry[1])
            }
        }
        fetchProduct()
        fetchCategory()
    }, [page, sortBy, sortDir, filter, searchValue, catPage])
    return (
        <>
            <Navbar
                onClick={() => searchBtnHandler()}
                onChange={(e) => setSearchProduct(e.target.value)}
                onKeyDown={handleKeyEnter}
            />
            <Box
                // border="1px solid red"
                mx="auto"
                mt="90px"
                w="1100px"
                h="1600px"
                // p="10px 24px"
                display="block"
                // borderBottom="1px solid #dfe1e3"
            >
                {/* Path history */}
                <Box
                    // border="1px solid green"
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
                    // border="1px solid blue"
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
                        <Select onChange={sortBtnHandler}>
                            <option value="product_name ASC">A - Z</option>
                            <option value="product_name DESC">Z - A</option>
                            <option value="price DESC">Highest</option>
                            <option value="price ASC">Lowest</option>
                        </Select>
                    </HStack>
                </Box>

                {/* Content */}
                <Box
                    // border="1px solid brown"
                    display="flex"
                    gap="4px"
                    // borderBottom="1px solid #dfe1e3"
                >
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
                        <Box mt="20px" display="grid" h="auto">
                            <Text fontWeight="bold" fontSize="14px" mb="10px">
                                Categories
                            </Text>
                            {/* <Box>{renderCategory()}</Box> */}
                            {/* <Select onChange={filterBtnHandler}>
                                {category.map((val) => (
                                    <option value={val.id}>
                                        {val.category_name}
                                    </option>
                                ))}
                            </Select> */}
                            <Grid gap="5px">
                                {category.map((val) => (
                                    <Button
                                        onClick={filterBtnHandler}
                                        value={val.id}
                                        bgColor="white"
                                        borderBottom="1px solid #dfe1e3"
                                        justifyContent="flex-start"
                                        _hover={{
                                            bgColor: "#dfe1e3",
                                            borderRadius: "10px",
                                            color: "#0095DA",
                                        }}
                                    >
                                        {val.category_name}
                                    </Button>
                                ))}
                            </Grid>

                            {/* {category.length >= catTotalCount ? null : (
                                <Button
                                    onClick={seeMoreBtnHandler}
                                    mt="6"
                                    colorScheme="linkedin"
                                    w="100%"
                                >
                                    See More
                                </Button>
                            )} */}
                        </Box>
                    </Box>

                    {/* Product */}
                    <Box
                        // border="1px solid green"
                        borderRadius="12px"
                        w="912px"
                        h="1000px"
                        display="grid"
                    >
                        {!products.length ? (
                            <Alert status="warning">
                                <AlertIcon />
                                <AlertTitle textAlign="center">
                                    No Products Found
                                </AlertTitle>
                            </Alert>
                        ) : null}
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
                {/* Page */}
                <GridItem>
                    <HStack justifyContent="end" gap="2px">
                        {page === 1 ? null : (
                            <CgChevronLeft
                                bgColor="#0095DA"
                                onClick={prevPageBtnHandler}
                                color="#0095DA"
                                cursor="pointer"
                                size={20}
                            />
                        )}

                        {page >= maxPage ? null : (
                            <CgChevronRight
                                bgColor="#0095DA"
                                color="#0095DA"
                                onClick={nextPageBtnHandler}
                                cursor="pointer"
                                size={20}
                            />
                        )}
                    </HStack>
                </GridItem>
            </Box>
        </>
    )
}

export default Product
