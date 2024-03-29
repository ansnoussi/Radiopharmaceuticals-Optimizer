import { Typography, Divider } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { GithubOutlined } from '@ant-design/icons';
import useMediaQuery from '../../hooks/useMediaQuery';
import { FeedbackForm } from './Components';

const { Title, Paragraph, Text, Link } = Typography;

const Infos = () => {
  const { currentTheme } = useThemeSwitcher();

  const appLogo = useMediaQuery(
    '(max-width: 767px)',
    null,
    <img
      src={currentTheme === 'dark' ? 'logo-filled-white.png' : 'logo-filled-black.png'}
      style={{ height: 150, aspectRatio: 1 }}
      alt="app-logo"
    />,
  );

  return (
    <>
      <Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <Title>RP Optimizer</Title>
            <Paragraph>
            <Text strong>Rp Optimizer</Text>{' '} (short for Radiopharmaceuticals Optimizer) is an open source web app that optimizes the usage of limited supply
              of Radioactive pharmaceuticals during PET scans to detect cancerous cells.
            </Paragraph>
            <Link href='https://github.com/ansnoussi/Radiopharmaceuticals-Optimizer' target="_blank" > <GithubOutlined /> Become a contributor</Link>
            
          </div>
          {appLogo}
        </div>
        <Title level={2}>Case Study</Title>
        <Paragraph>
          The Sahloul University Hospital ,being the first Hospital to make use of this app, had a great deal of impact
          on the development process. In fact this app was built solely for Sahloul University Hospital but then I
          decided to open source it.
        </Paragraph>
        <Paragraph>
          At said hospital, the PET (Positron emission tomography) unit used fluor 18 marked fluorodeoxyglucose who's
          radioactivity allowed the PET camera to visualise the cancerous cells during the scan.
        </Paragraph>
        <Paragraph>
          This pharmaceutical is both expensive and his radioactivity decrease rapidly (half life of 110 min).
        </Paragraph>
        <Paragraph>
          On the scan day, the PET unit receives the pharmaceutical and it has to decide on how to decide on an optimal
          way to divide it between several patients (each with different needs in term of : scan time and required
          radioactivity needed for the scan).
        </Paragraph>
        <Paragraph>
          In comes our app whose purpose is to effectively and efficiently order patients during a PET scan given an
          initial state, and also to show usefull statistics and predictions that are crucial for the PET machine
          operator.
        </Paragraph>
      </Typography>

      <Divider />

      <Title level={2}>Send Feedback</Title>
      <FeedbackForm />
    </>
  );
};

export default Infos;
