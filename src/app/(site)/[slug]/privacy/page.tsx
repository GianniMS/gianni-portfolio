import { DocParams, ProductDocPage, docMetadata, docStaticParams } from '@/components/product/productDocs'

export const generateStaticParams = () => docStaticParams('privacy')
export const generateMetadata = (props: DocParams) => docMetadata('privacy', props)

export default function ProductPrivacyPage(props: DocParams) {
  return <ProductDocPage kind="privacy" {...props} />
}
