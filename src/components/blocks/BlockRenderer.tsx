import type {
  BlockRecord,
  CardGridData,
  ContactPanelData,
  CtaData,
  HeroData,
  OpenPositionsData,
  PartnersTrustBarData,
  ProductsGridData,
  ProductsPreviewData,
  QuoteData,
  RichTextData,
  SectionData,
  StatsBarData,
  StatsQuoteData,
} from "@/lib/blocks/types";
import { HeroBlock } from "./HeroBlock";
import { RichTextBlock } from "./RichTextBlock";
import { CardGridBlock } from "./CardGridBlock";
import { StatsBarBlock } from "./StatsBarBlock";
import { StatsQuoteBlock } from "./StatsQuoteBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CtaBlock } from "./CtaBlock";
import { ProductsPreviewBlock } from "./ProductsPreviewBlock";
import { PartnersTrustBarBlock } from "./PartnersTrustBarBlock";
import { OpenPositionsBlock } from "./OpenPositionsBlock";
import { ContactPanelBlock } from "./ContactPanelBlock";
import { ProductsGridBlock } from "./ProductsGridBlock";
import { SectionBlock } from "./SectionBlock";

export function BlockRenderer({
  block,
  contactInitialMessage,
}: {
  block: BlockRecord;
  // Only read by a "contactPanel" block — threaded down from the page's
  // ?role= search param so a careers "Apply" link can prefill the message.
  contactInitialMessage?: string;
}) {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data as HeroData} />;
    case "richText":
      return <RichTextBlock data={block.data as RichTextData} />;
    case "cardGrid":
      return <CardGridBlock data={block.data as CardGridData} />;
    case "statsBar":
      return <StatsBarBlock data={block.data as StatsBarData} />;
    case "statsQuote":
      return <StatsQuoteBlock data={block.data as StatsQuoteData} />;
    case "quote":
      return <QuoteBlock data={block.data as QuoteData} />;
    case "cta":
      return <CtaBlock data={block.data as CtaData} />;
    case "productsPreview":
      return <ProductsPreviewBlock data={block.data as ProductsPreviewData} />;
    case "partnersTrustBar":
      return <PartnersTrustBarBlock data={block.data as PartnersTrustBarData} />;
    case "openPositions":
      return <OpenPositionsBlock data={block.data as OpenPositionsData} />;
    case "contactPanel":
      return (
        <ContactPanelBlock data={block.data as ContactPanelData} initialMessage={contactInitialMessage} />
      );
    case "productsGrid":
      return <ProductsGridBlock data={block.data as ProductsGridData} />;
    case "section":
      return <SectionBlock data={block.data as SectionData} />;
    default:
      return null;
  }
}
