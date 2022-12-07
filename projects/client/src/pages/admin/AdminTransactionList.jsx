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
    Center,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"

const AdminTransactionList = () => {
    const [transactionData, setTransactionData] = useState([])
    const [transactionItemData, setTransactionItemData] = useState([])
    const [productData, setProductData] = useState([])
    const [totalStockData, setTotalStockData] = useState([])
    const [warehouseData, setWarehouseData] = useState([])

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/admin/transaction/get/`)
            setTransactionData(response.data.data)

            for (let i = 0; i < transactionData.length; i++) {
                setTransactionItemData(transactionData[i].Transaction_Items)
                for (let j = 0; j < transactionItemData.length; j++) {
                    setProductData(transactionItemData[j].Product)
                    // for (let k = 0; k < productData.length; k++) {
                    //     setTotalStockData(productData[k].Total_Stocks)
                    // }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <Box ml="250px" mr="1.5em">
                <Box mt="2em">
                    <Text
                        fontSize="20px"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                    >
                        Transaction History
                    </Text>

                    <Flex
                        mt="3vh"
                        border="1px solid #dfe1e3"
                        borderRadius="8px"
                        p="5px"
                        gap="2"
                        w="40vh"
                    >
                        <Button bgColor="#F7931E" color="white" _hover="white">
                            <Text fontSize="sm">All transaction</Text>
                        </Button>
                        <Button
                            variant="ghost"
                            _hover={{ bgColor: "#F7931E", color: "white" }}
                        >
                            <Text fontSize="sm">Completed</Text>
                        </Button>
                        <Button
                            variant="ghost"
                            _hover={{ bgColor: "#F7931E", color: "white" }}
                        >
                            <Text fontSize="sm">Pending</Text>
                        </Button>
                        <Button
                            variant="ghost"
                            _hover={{ bgColor: "#F7931E", color: "white" }}
                        >
                            <Text fontSize="sm">Canceled</Text>
                        </Button>
                    </Flex>

                    <TableContainer
                        border="1px solid #dfe1e3"
                        mt="3vh"
                        borderRadius="8px"
                    >
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th w="100px">
                                        <Text fontSize="10px">Id product</Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">User</Text>
                                    </Th>
                                    <Th w="150px">
                                        <Text fontSize="10px">
                                            Payment Date
                                        </Text>
                                    </Th>
                                    <Th w="200px">
                                        <Text fontSize="10px">
                                            Payment Proof
                                        </Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">
                                            Total quantity
                                        </Text>
                                    </Th>
                                    <Th w="100px">
                                        <Text fontSize="10px">Total Price</Text>
                                    </Th>
                                    <Th w="200px">
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
                                <Tr>
                                    <Td>
                                        <Button variant="link">1</Button>
                                    </Td>
                                    <Td>
                                        <Text>rena</Text>
                                    </Td>
                                    <Td>
                                        <Text variant="link">2022-12-10</Text>
                                    </Td>
                                    <Td>
                                        <Image
                                            objectFit="fill"
                                            w="100px"
                                            h="100px"
                                            src="https://yt3.ggpht.com/TDWyRYRe3WaBhVweg7WZ9TOQXdzVJ1fMAtdqJ3l40Nmh-h7dIh7HvZCvQ7-g8vnDH3mYadielQ=s900-c-k-c0x00ffffff-no-rj"
                                        />
                                    </Td>
                                    <Td>
                                        <Text>2</Text>
                                    </Td>
                                    <Td>
                                        <Text>2000000</Text>
                                    </Td>
                                    <Td>
                                        <Text>Pending</Text>
                                    </Td>
                                    <Td>
                                        <Text>A</Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default AdminTransactionList
