import type { CaseStudyContentBlock, CaseStudyMetric, CaseStudyTimeline, CaseStudyFeature } from '../../types/caseStudy';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import PhoneMockupBlock from './PhoneMockupBlock';
import DiagramBlock from './DiagramBlock';
import MetricsBlock from './MetricsBlock';
import TimelineBlock from './TimelineBlock';
import FeaturesBlock from './FeaturesBlock';
import TwoColumnBlock from './TwoColumnBlock';

interface ContentBlockRendererProps {
  blocks: CaseStudyContentBlock[];
  metrics?: CaseStudyMetric[];
  timeline?: CaseStudyTimeline[];
  features?: CaseStudyFeature[];
}

export default function ContentBlockRenderer({
  blocks,
  metrics,
  timeline,
  features
}: ContentBlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-20 sm:space-y-24 lg:space-y-32">
      {blocks.map((block) => {
        switch (block.block_type) {
          case 'text':
            return (
              <div key={block.id} className="animate-fade-in">
                <TextBlock data={block.content} />
              </div>
            );

          case 'image':
            return (
              <div key={block.id} className="animate-fade-in">
                <ImageBlock data={block.content} />
              </div>
            );

          case 'phone_mockup':
            return (
              <div key={block.id} className="animate-fade-in">
                <PhoneMockupBlock data={block.content} />
              </div>
            );

          case 'diagram':
            return (
              <div key={block.id} className="animate-fade-in">
                <DiagramBlock data={block.content} />
              </div>
            );

          case 'metrics':
            return (
              <div key={block.id} className="animate-fade-in">
                <MetricsBlock metrics={metrics || []} />
              </div>
            );

          case 'timeline':
            return (
              <div key={block.id} className="animate-fade-in">
                <TimelineBlock timeline={timeline || []} />
              </div>
            );

          case 'features':
            return (
              <div key={block.id} className="animate-fade-in">
                <FeaturesBlock features={features || []} />
              </div>
            );

          case 'two_column':
            return (
              <div key={block.id} className="animate-fade-in">
                <TwoColumnBlock data={block.content} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
