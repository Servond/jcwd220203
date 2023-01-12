import { Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const CategoryNavbarItems = ({ category_name, id }) => {
    const navigate = useNavigate()
    return (
        <Text
            _hover={{
                bgColor: "#A5D8F8",
                borderRadius: "5px",
            }}
            p="5px"
            onClick={() => navigate(`/product?category=${id}`)}
        >
            {category_name}
        </Text>
    )
}

export default CategoryNavbarItems
