import PhoneMockup from '../PhoneMockup';
import type { PhoneMockupBlockData } from '../../types/caseStudy';

interface PhoneMockupBlockProps {
  data: PhoneMockupBlockData;
}

export default function PhoneMockupBlock({ data }: PhoneMockupBlockProps) {
  const { app_name = 'AI Assistant', messages } = data;

  return (
    <div className="max-w-4xl mx-auto px-6">
      <PhoneMockup messages={messages} appName={app_name} />
    </div>
  );
}
