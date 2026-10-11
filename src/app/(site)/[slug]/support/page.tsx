import { DocParams, ProductDocPage, docMetadata, docStaticParams } from '@/components/product/productDocs'

export const generateStaticParams = () => docStaticParams('support')
export const generateMetadata = (props: DocParams) => docMetadata('support', props)

export default function ProductSupportPage(props: DocParams) {
  return <ProductDocPage kind="support" {...props} />
}
