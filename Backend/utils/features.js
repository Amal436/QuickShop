class Features {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword?{
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }:
        {

        }
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
       const queryCopy = {...this.queryStr};
       const category = queryCopy.category;
       category?queryCopy.category=category.toLowerCase():{};
       const removeFields = ["keyword","page","limit"];
       removeFields.map((key)=>delete queryCopy[key]);
       this.query = this.query.find(queryCopy);
       return this;
    }

    pagination(resultPerPage){
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resultPerPage*(currentPage-1);

      this.query = this.query.limit(resultPerPage).skip(skip);
      return this;
    }
}

module.exports = Features;