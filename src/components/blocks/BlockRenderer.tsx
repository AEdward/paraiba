import type {
  BlockRecord,
  CardGridData,
  ContactPanelData,
  CtaData,
  HeroData,
  LiveDemoData,
  OpenPositionsData,
  PartnersTrustBarData,
  ProductsGridData,
  ProductsPreviewData,
  QuoteData,
  RichTextData,
  StatsQuoteData,
} from "@/lib/blocks/types";
import type { Project } from "@/lib/projects";
import { HeroBlock } from "./HeroBlock";
import { RichTextBlock } from "./RichTextBlock";
import { CardGridBlock } from "./CardGridBlock";
import { StatsQuoteBlock } from "./StatsQuoteBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CtaBlock } from "./CtaBlock";
import { ProductsPreviewBlock } from "./ProductsPreviewBlock";
import { PartnersTrustBarBlock } from "./PartnersTrustBarBlock";
import { OpenPositionsBlock } from "./OpenPositionsBlock";
import { ContactPanelBlock } from "./ContactPanelBlock";
import { ProductsGridBlock } from "./ProductsGridBlock";
import { LiveDemoBlock } from "./LiveDemoBlock";

export function BlockRenderer({
  block,
  contactInitialMessage,
  project,
}: {
  block: BlockRecord;
  // Only read by a "contactPanel" block — threaded down from the page's
  // ?role= search param so a careers "Apply" link can prefill the message.
  contactInitialMessage?: string;
  // Only read by a "liveDemo" block, on a product's own mini-site pages.
  project?: Project;
}) {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data as HeroData} />;
    case "richText":
      return <RichTextBlock data={block.data as RichTextData} />;
    case "cardGrid":
      return <CardGridBlock data={block.data as CardGridData} />;
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
    case "liveDemo":
      return <LiveDemoBlock data={block.data as LiveDemoData} project={project} />;
    default:
      return null;
  }
}
