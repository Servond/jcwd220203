import {
    Box,
    Button,
    Flex,
    Text,
    Th,
    Thead,
    Tr,
    Table,
    TableContainer,
    Tbody,
    Td,
    Image,
    Spacer,
    Select,
    HStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Stack,
    Skeleton,
    Input,
    InputGroup,
    GridItem,
    Grid,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { CgChevronLeft, CgChevronRight } from "react-icons/cg"
import { axiosInstance } from "../../api"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useSelector } from "react-redux"
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"
import { TbSearch } from "react-icons/tb"

const AdminOrderHistory = () => {
    const [transactionData, setTransactionData] = useState([])
    const [warehouseData, setWarehouseData] = useState([])
    const [imageData, setImageData] = useState([])
    const [productData, setProductData] = useState({
        product_name: "",
        description: "",
        price: "",
        id: "",
    })
    const [productId, setProductId] = useState(0)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [filter, setFilter] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authSelector = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)

    const maxItemsPerPage = 7
    const fetchData = async () => {
        try {
            let url = `/admin/order-history/get`

            console.log("CCCCCC", authSelector)
            if (authSelector.WarehouseId) {
                await axiosInstance.get(
                    (url += `?WarehouseId=${authSelector.WarehouseId}`)
                )
            }
            console.log("URLLL", url)
            const response = await axiosInstance.get(url, {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    WarehouseId: filter,
                },
            })
            console.log(`AAAAAAAAAAAAA`, authSelector.WarehouseId)
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
            console.log("response", response.data)
            if (page === 1) {
                setTransactionData(response.data.data)
            } else {
                setTransactionData(response.data.data)
            }
            setIsLoading(true)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchData2 = async () => {
        try {
            let url = `/admin/order-history/get2`

            if (authSelector.WarehouseId) {
                url += `?WarehouseId=${authSelector.WarehouseId}`
            }

            const response = await axiosInstance.get(url, {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    WarehouseId: filter,
                },
            })
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
            if (page === 1) {
                setTransactionData(response.data.data)
            } else {
                setTransactionData(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const fetchWarehouse = async () => {
        try {
            const response = await axiosInstance.get("/warehouse")
            setWarehouseData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get(`/product/${productId}`)
            setProductData(response.data.data)
            setImageData(response.data.data.Image_Urls)
        } catch (err) {
            console.log(err)
        }
    }

    const filterBtnHandler = ({ target }) => {
        const { value } = target
        setFilter(value)
        setIsLoading(false)
        // setSortBy(value)
    }

    const nextPageBtnHandler = () => {
        setPage(page + 1)
        setIsLoading(false)
    }

    const prevPageBtnHandler = () => {
        setPage(page - 1)
        setIsLoading(false)
    }
    console.log("trans", transactionData.map((val) => val.WarehouseId)[0])
    useEffect(() => {
        fetchData()
        // fetchData2()
        fetchWarehouse()
        fetchProduct()
    }, [page, filter, productId, authSelector])
    return (
        <>
            <Box ml="250px" mr="1.5em">
                <Box mt="2em">
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                    >
                        Transaction History
                    </Text>
                    <Box mt="3vh">
                        <Grid
                            p="5px"
                            gap="5"
                            w="full"
                            gridTemplateColumns="repeat(4,1fr)"
                        >
                            {/* Sort */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                                // onChange={sortHandler}
                            >
                                <Select placeholder="Sort">
                                    <option value={"ASC"}>Old</option>
                                    <option value={"DESC"}>Latest</option>
                                </Select>
                            </GridItem>

                            {/* Month */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                                // onChange={filterMonthBtnHandler}
                            >
                                <Select>
                                    <option value="">By Month</option>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </Select>
                            </GridItem>

                            {/* Warehouse */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                // onChange={filterWarehouseBtnHandler}
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                            >
                                <Select>
                                    <option value="">By Warehouse</option>
                                    {/* {authSelector.WarehouseId ===
                                    salesData.map((val) => val.WarehouseId)[0]
                                        ? salesData.map((val) => (
                                              <option value={val.WarehouseId}>
                                                  {val.warehouse_name}
                                              </option>
                                          ))[0]
                                        : warehouseData.map((val) => (
                                              <option value={val.id}>
                                                  {val.warehouse_name}
                                              </option>
                                          ))} */}
                                </Select>
                            </GridItem>

                            {/* Search */}
                            <GridItem
                                w="full"
                                justifySelf="center"
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                            >
                                <InputGroup>
                                    <Input
                                        placeholder="Search here"
                                        _placeholder={{ fontSize: "14px" }}
                                        // onChange={(e) =>
                                        //     setSearchInput(e.target.value)
                                        // }
                                        // onKeyDown={handleKeyEnter}
                                        // value={searchInput}
                                    />
                                    <Button
                                        borderLeftRadius={"0"}
                                        type="submit"
                                        bgColor={"white"}
                                        border="1px solid #e2e8f0"
                                        borderLeft={"0px"}
                                        // onClick={searchBtnHandler}
                                    >
                                        <TbSearch />
                                    </Button>
                                </InputGroup>
                            </GridItem>
                        </Grid>
                    </Box>

                    <TableContainer
                        border="1px solid #dfe1e3"
                        mt="3vh"
                        borderRadius="8px"
                        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                        bgColor="white"
                    >
                        <Table variant={"striped"} colorScheme={"blue"}>
                            <Thead>
                                <Tr>
                                    <Th w="100px">
                                        <Text fontSize="10px">invoice</Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">User</Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">Order Date</Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">
                                            Total quantity
                                        </Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">Total Price</Text>
                                    </Th>
                                    <Th w="150px">
                                        <Text fontSize="10px">
                                            Order status
                                        </Text>
                                    </Th>
                                    <Th w="200px">
                                        <Text fontSize="10px">
                                            Warehouse Branch
                                        </Text>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isLoading &&
                                    transactionData.map((val) => (
                                        <Tr>
                                            <Td>
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        setProductId(
                                                            //     val.TransactionItems.map(
                                                            //         (val) =>
                                                            //             val.ProductId
                                                            //     )
                                                            // )

                                                            val.productId //raw query
                                                        )
                                                        onOpen()
                                                    }}
                                                >
                                                    <Text color="#0095DA">
                                                        #
                                                        {
                                                            // val.transaction_name

                                                            val.transaction_name //raw query
                                                        }
                                                    </Text>
                                                </Button>
                                            </Td>
                                            <Td maxW="100px">
                                                <Text
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                >
                                                    {/* {val.User.username} */}

                                                    {/* raw query */}
                                                    {val.username}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {
                                                        val.createdAt.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {val.total_quantity}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        }
                                                    ).format(val.total_price)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {/* {
                                                    val.Order_status
                                                        .order_status_name
                                                } */}

                                                    {/* raw query */}
                                                    {val.order_status}
                                                </Text>
                                            </Td>

                                            <Td>
                                                <Text>
                                                    {/* {val.Warehouse.warehouse_name} */}

                                                    {/* raw query */}
                                                    {val.warehouse_name}
                                                </Text>
                                            </Td>
                                        </Tr>
                                    ))}
                                {isLoading === false ? (
                                    <Tr>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="60%"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="70%"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="100%"
                                                borderRadius="8px"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="45%"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                            />
                                        </Td>
                                        <Td p="10px">
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                w="30%"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                            <Skeleton
                                                startColor="#bab8b8"
                                                endColor="#d4d2d2"
                                                h="20px"
                                                borderRadius="8px"
                                                mt="2"
                                            />
                                        </Td>
                                    </Tr>
                                ) : null}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Page */}
                    <HStack justifyContent="center" gap="2" mt="1em">
                        {page === 1 ? null : (
                            <AiOutlineLeftCircle
                                bgColor="#0095DA"
                                onClick={prevPageBtnHandler}
                                color="#0095DA"
                                cursor="pointer"
                                size={20}
                            />
                        )}
                        <Text color="#0095DA">{page}</Text>
                        {page >= maxPage ? null : (
                            <AiOutlineRightCircle
                                bgColor="#0095DA"
                                color="#0095DA"
                                onClick={nextPageBtnHandler}
                                cursor="pointer"
                                size={20}
                            />
                        )}
                    </HStack>
                </Box>
            </Box>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            mx="auto"
                            mt="20px"
                            w="auto"
                            h="350px"
                            display="block"
                        >
                            <Box display="flex" gap="20px">
                                <Box
                                    borderRadius="12px"
                                    display="block"
                                    w="348px"
                                    h="420px"
                                >
                                    <Carousel
                                        showStatus={false}
                                        showArrows={true}
                                        showIndicators={false}
                                        verticalSwipe="natural"
                                        swipeable={true}
                                    >
                                        {imageData.map((val) => (
                                            <Stack>
                                                <Box
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
                                                    />
                                                </Box>
                                            </Stack>
                                        ))}
                                    </Carousel>
                                </Box>
                                <Box
                                    borderRadius="12px"
                                    w="468px"
                                    h="700px"
                                    display="block"
                                >
                                    <Box display="grid" gap="20px">
                                        <Stack w="468px" h="48px">
                                            <Text
                                                fontSize="16"
                                                fontFamily="sans-serif"
                                                fontWeight="bold"
                                            >
                                                {productData?.product_name}
                                            </Text>
                                        </Stack>
                                        <Stack
                                            w="468px"
                                            h="80px"
                                            borderBottom="1px solid #dfe1e3"
                                        >
                                            <Text
                                                fontSize="28"
                                                fontFamily="sans-serif"
                                                fontWeight="bold"
                                            >
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }
                                                ).format(productData?.price)}
                                            </Text>
                                        </Stack>
                                        <Stack w="468px" h="110px">
                                            <Text
                                                fontSize="14"
                                                fontFamily="sans-serif"
                                                overflow="hidden"
                                                textOverflow="ellipsis"
                                                noOfLines={[1, 5]}
                                            >
                                                {productData?.description}
                                            </Text>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AdminOrderHistory
