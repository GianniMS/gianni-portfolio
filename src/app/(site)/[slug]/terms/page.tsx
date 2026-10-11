import { DocParams, ProductDocPage, docMetadata, docStaticParams } from '@/components/product/productDocs'

export const generateStaticParams = () => docStaticParams('terms')
export const generateMetadata = (props: DocParams) => docMetadata('terms', props)

export default function ProductTermsPage(props: DocParams) {
  return <ProductDocPage kind="terms" {...props} />
}
