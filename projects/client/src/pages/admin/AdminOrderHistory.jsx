import {
    Box,
    Button,
    Text,
    Th,
    Thead,
    Tr,
    Table,
    TableContainer,
    Tbody,
    Td,
    Image,
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
    ModalHeader,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import moment from "moment"
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
    const [productData, setProductData] = useState([])
    const [productId, setProductId] = useState(0)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authSelector = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [filterWarehouse, setFilterWarehouse] = useState("")
    const [filterMonth, setFilterMonth] = useState("")
    const [sort, setSort] = useState("DESC")
    const [searchValue, setSearchValue] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [dataById, setDataById] = useState([])

    const maxItemsPerPage = 10
    const fetchData = async () => {
        try {
            let url = `/admin/order-history/get4`
            if (authSelector.WarehouseId) {
                await axiosInstance.get(
                    (url += `?WarehouseId=${authSelector.WarehouseId}`)
                )
            }
            const response = await axiosInstance.get(url, {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    WarehouseId: filterWarehouse,
                    createdAt: filterMonth,
                    _sortBy: sort,
                    transaction_name: searchValue,
                },
            })
            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
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

    const fetchWarehouse = async () => {
        try {
            const response = await axiosInstance.get(
                "/admin/order-history/findWarehouse"
            )
            setWarehouseData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get(
                `/admin/order-history/getId/${productId}`
            )
            console.log("RESID", response.data.data)
            setDataById(response.data.data)
            setIsLoading(true)
        } catch (err) {
            console.log(err)
        }
    }

    const filterWarehouseBtnHandler = ({ target }) => {
        const { value } = target
        setFilterWarehouse(value)
        setIsLoading(false)
    }

    const filterMonthBtnHandler = ({ target }) => {
        const { value } = target
        setFilterMonth(value)
        setIsLoading(false)
    }

    const sortHandler = ({ target }) => {
        const { value } = target
        setSort(value)
        setIsLoading(false)
    }
    const searchBtnHandler = () => {
        setSearchValue(searchInput)
        setIsLoading(false)
    }
    const handleKeyEnter = (e) => {
        if (e.key === "Enter") {
            setSearchValue(searchInput)
        }
    }
    const nextPageBtnHandler = () => {
        setPage(page + 1)
        setIsLoading(false)
    }

    const prevPageBtnHandler = () => {
        setPage(page - 1)
        setIsLoading(false)
    }
    console.log(
        "trans",
        transactionData.map((val) =>
            val.TransactionItems.map((ti) =>
                ti.Product.Image_Urls.map((img) => img.image_url)
            )
        )
    )
    console.log("TRXID", transactionData.map((val) => val.id)[0])
    console.log(
        "ID",
        dataById.map((val) =>
            val.TransactionItems.map((ti) =>
                ti.Product.Image_Urls.map((img) => img.image_url)
            )
        )
    )
    console.log("PR", productId)
    useEffect(() => {
        fetchData()
        fetchWarehouse()
        fetchProduct()
    }, [
        page,
        filterMonth,
        filterWarehouse,
        sort,
        productId,
        authSelector,
        searchValue,
    ])
    return (
        <>
            <Box ml="250px" mr="1.5em">
                <Box mt="2em">
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                    >
                        Order History
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
                                onChange={sortHandler}
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
                                onChange={filterMonthBtnHandler}
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
                                onChange={filterWarehouseBtnHandler}
                                border="1px solid #dfe1e3"
                                borderRadius="8px"
                            >
                                <Select>
                                    <option value="">By Warehouse</option>
                                    {authSelector.WarehouseId ===
                                    transactionData.map(
                                        (val) => val.WarehouseId
                                    )[0]
                                        ? transactionData.map((val) => (
                                              <option value={val.WarehouseId}>
                                                  {val.Warehouse.warehouse_name}
                                              </option>
                                          ))[0]
                                        : warehouseData.map((val) => (
                                              <option value={val.id}>
                                                  {val.warehouse_name}
                                              </option>
                                          ))}
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
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyEnter}
                                        value={searchInput}
                                    />
                                    <Button
                                        borderLeftRadius={"0"}
                                        type="submit"
                                        bgColor={"white"}
                                        border="1px solid #e2e8f0"
                                        borderLeft={"0px"}
                                        onClick={searchBtnHandler}
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
                                    <Th p="10px">
                                        <Text fontSize="10px">invoice</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">User</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">Order Date</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">
                                            Total quantity
                                        </Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">Total Price</Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">
                                            Order status
                                        </Text>
                                    </Th>
                                    <Th p="10px">
                                        <Text fontSize="10px">Warehouse</Text>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isLoading &&
                                    transactionData.map((val) => (
                                        <Tr h="50px">
                                            <Td p="10px">
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        setProductId(val.id)
                                                        onOpen()
                                                    }}
                                                >
                                                    <Text color="#0095DA">
                                                        {val.transaction_name}
                                                    </Text>
                                                </Button>
                                            </Td>
                                            <Td p="10px">
                                                <Text
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                >
                                                    {val.User.username}
                                                </Text>
                                            </Td>
                                            <Td p="10px">
                                                <Text>
                                                    {moment(
                                                        val.createdAt
                                                    ).format(
                                                        "DD MMMM YYYY, HH:mm:ss"
                                                    )}
                                                </Text>
                                            </Td>
                                            <Td p="10px">
                                                <Text>
                                                    {val.total_quantity}
                                                </Text>
                                            </Td>
                                            <Td p="10px">
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
                                            <Td p="10px">
                                                <Text>
                                                    {
                                                        val.Order_status
                                                            .order_status_name
                                                    }
                                                </Text>
                                            </Td>

                                            <Td p="10px">
                                                <Text>
                                                    {
                                                        val.Warehouse
                                                            .warehouse_name
                                                    }
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
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxH="50%" overflow="scroll">
                    <ModalHeader>
                        <Text fontSize="16px">Product List</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {dataById.map((val) => (
                            <Box
                                p={"16px"}
                                border={"1px solid #e5e7e9"}
                                borderRadius={"8px"}
                                cursor={"default"}
                                mb={"10px"}
                            >
                                <Grid templateColumns="3.25fr 1.75fr" gap={0}>
                                    <GridItem
                                        borderRight={"thin dashed #e5e7e9"}
                                        maxH={"90px"}
                                    >
                                        <Box
                                            pr={"14px"}
                                            display={"flex"}
                                            alignItems={"flex-start"}
                                            mt={"2px"}
                                        >
                                            <Image
                                                src={val.TransactionItems.map(
                                                    (ti) =>
                                                        ti.Product.Image_Urls.map(
                                                            (img) =>
                                                                img.image_url
                                                        )
                                                )}
                                                w={"45.99px"}
                                                h={"45.99px"}
                                                mr={"13px"}
                                                borderRadius={"6px"}
                                            />
                                            <Box>
                                                <Text
                                                    color={"#31353BF5"}
                                                    fontSize={"12px"}
                                                    fontFamily={
                                                        "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                    }
                                                    fontWeight={"bold"}
                                                    lineHeight={"18px"}
                                                    letterSpacing={"0px"}
                                                >
                                                    {productData}
                                                </Text>
                                                {/* 
                                            <Text
                                                color={"#31353BAD"}
                                                fontSize={"12px"}
                                                fontFamily={
                                                    "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                                }
                                                fontWeight={400}
                                                lineHeight={"18px"}
                                                letterSpacing={"0px"}
                                            >
                                                {quantity}{" "}
                                                {quantity > 1
                                                    ? "items"
                                                    : "item"}{" "}
                                                x{" "}
                                                {
                                                    new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }
                                                    )
                                                        .format(price)
                                                        .split(",")[0]
                                                }
                                            </Text> */}
                                            </Box>
                                        </Box>
                                    </GridItem>
                                    <GridItem
                                        pl={"16px"}
                                        w={"151.99px"}
                                        naxH={"90px"}
                                        display={"flex"}
                                        flexDir={"column"}
                                        justifyContent={"center"}
                                    >
                                        <Box
                                            display={"flex"}
                                            flexDir={"column"}
                                            alignItems={"flex-end"}
                                        >
                                            {/* <Text
                                            fontSize={"14px"}
                                            fontFamily={
                                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                            }
                                            mb={"2px"}
                                            color={"#31353BF5"}
                                            fontWeight={400}
                                            lineHeight={"20px"}
                                            letterSpacing={"0px"}
                                        >
                                            Total Price
                                        </Text> */}
                                            {/* <Text
                                            color={"#31353BF5"}
                                            fontSize={"14px"}
                                            fontFamily={
                                                "Open Sauce One, Nunito Sans, -apple-system, sans-serif"
                                            }
                                            lineHeight={"20px"}
                                            letterSpacing={"0px"}
                                            fontWeight={700}
                                        >
                                            {
                                                new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })
                                                    .format(quantity * price)
                                                    .split(",")[0]
                                            }
                                        </Text> */}
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </Box>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AdminOrderHistory
