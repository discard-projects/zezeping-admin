<template>
  <div>
    <ProductCategoryNew ref="newProCateRef" @fetchData="fetchData"></ProductCategoryNew>
    <ProductCategoryEdit ref="editProCateRef" @fetchData="fetchData"></ProductCategoryEdit>
    <ProductNew ref="newProRef" @fetchData="fetchData"></ProductNew>
    <ProductEdit ref="editProRef" @fetchData="fetchData"></ProductEdit>
    <div v-if="storeDetail && !storeDetail.categories.length">
      该商店还没有纳入分类，请到商店详情设置
    </div>
    <div v-else-if="storeDetail">
      <h2>{{storeDetail.name}}</h2>
      <el-tabs v-model="activeTabName" @tab-click="tabClick">
        <el-tab-pane v-for="(item, index) in tabItems" :label="item.label" :name="item.name" :key="index">
          <div class="category-box">
            <div class="product-categories fl">
              <h3 style="text-align: center">商品分类</h3>
              <ul>
                <li v-for="(proCate, index) in item.object.product_categories" @click="currentProductCategory = proCate" :class="{'active': currentProductCategory == proCate}" :key="index">
                  <el-button size="mini" @click.stop="$refs['editProCateRef'].item = proCate">编辑</el-button>
                  {{ proCate.name }}
                </li>
                <li>
                  <el-button type="text" @click="$refs['newProCateRef'].showDialog({category: item})">新增分类</el-button>
                </li>
              </ul>
            </div>
            <div class="products" style="overflow: auto" v-if="currentProductCategory">
              <h3>
                商品列表 - {{currentProductCategory && currentProductCategory.name}}
                <el-button size="mini" @click="$refs['newProRef'].showDialog({productCategory: currentProductCategory})">新增</el-button>
              </h3>
              <ul v-if="currentProductCategory">
                <li v-for="(product, index) in currentProductCategory.products" :key="index">
                  <img :src="product.image_thumb.url">
                  <span>{{product.name}}</span>
                  <span>P{{product.price}}</span>
                  <el-button size="mini" @click.stop="$refs['editProRef'].item = product">编辑</el-button>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ProductCategoryNew from './ProductCategoryCom/New.vue'
import ProductCategoryEdit from './ProductCategoryCom/Edit.vue'
import ProductNew from './ProductCom/New.vue'
import ProductEdit from './ProductCom/Edit.vue'
export default {
  data () {
    return {
      storeDetail: null,
      activeTabName: '',
      currentProductCategory: null
    }
  },
  computed: {
    tabItems () {
      let items = (this.storeDetail && this.storeDetail.categories.map(category => {
        let names = (category.ancestors.map(ancestor => ancestor.name) || [])
        names.push(category.name)
        return {
          label: names.join('/'),
          name: `${category.id}`,
          object: category
        }
      })) || []
      return items
    }
  },
  methods: {
    fetchData () {
      this.api.getStoreDetail(this.$route.params.id).then(res => {
        this.storeDetail = res.data
        if (res.data.categories.length) {
          this.activeTabName = `${res.data.categories[0].id}`
          this.currentProductCategory = null
        }
      })
    },
    tabClick () {
    }
  },
  mounted () {
    this.fetchData()
  },
  components: {
    ProductCategoryNew,
    ProductCategoryEdit,
    ProductNew,
    ProductEdit
  }
}
</script>

<style lang="scss" scoped>
  .category-box {
    .product-categories {
      width: 200px;
      margin-right: 15px;

      ul > li {
        line-height: 44px;
        font-size: 16px;
        padding: 0 15px;

        &:hover {
          cursor: pointer;
          background: #f2f2f2;
        }

        &.active {
          color: #f00;
          background: #ccc;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #f2f2f2;
        }
      }
    }
    .products {
      ul > li {
        display: flex;
        align-items: center;
        height: 60px;
        font-size: 16px;
        border-bottom: 1px solid #f2f2f2;
        img {
          max-height: 30px;
        }
        span {
          margin: 0 15px;
        }
      }
    }
  }
</style>
