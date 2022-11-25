import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    List,
    ListItem,
    Select,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../api"

const CategoryList = ({ category_name, id }) => {
    const [category, setCategory] = useState({ category_name: "", id: "" })

    // const fetchCategory = async () => {
    //     try {
    //         const response = await axiosInstance.get(`/product/category/${id}`)
    //         setCategory(response.data.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <>
            <Box>
                <Button>
                    <List>
                        <ListItem>{category_name}</ListItem>
                    </List>
                </Button>
            </Box>
        </>
    )
}

export default CategoryList
