// import { Typography } from '@mui/material';

import Phrases from '../components/Phrases';

interface PhrasesPageProps {
  learnables: any[];
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
