import { prisma } from "../config/prisma";

class _Category_ {
    async allCategoriesQuery() {
        const categories = await prisma.category.findMany({});
        return categories;
    }
}

const Category = new _Category_();
export default Category;
