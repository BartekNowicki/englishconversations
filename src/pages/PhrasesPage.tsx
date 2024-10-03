import Phrases from '../components/Phrases';
import { Learnable } from '../types';

interface PhrasesPageProps {
  learnables: Learnable[];
  loading: boolean;
  error: string | null;
}

const PhrasesPage: React.FC<PhrasesPageProps> = ({ learnables, loading, error }) => {
  return (
    <div>
        <Phrases learnables={learnables} loading={loading} error={error} />
    </div>
  );
};

export default PhrasesPage;
