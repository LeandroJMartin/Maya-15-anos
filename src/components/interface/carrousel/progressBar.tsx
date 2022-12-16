import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressBar = ({ item, total }: Props) => {
  const porcetagem = ((item * 100) / total).toFixed(2);

  return (
    <Container>
      <div className="flex gap-2 items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={item}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{
              duration: 0.1
            }}
            className="text-lg"
          >
            {item.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>

        <span className="block w-[8px] h-[8px] bg-greenMaya rounded-[100%]" />

        <span className="text-lg">{total.toString().padStart(2, '0')}</span>
      </div>

      <div>
        <div className="block w-full h-[4px] bg-gray-400 rounded-lg z-[30]">
          <span
            className="block h-full rounded-lg bg-greenMaya transition-all"
            style={{ width: `${porcetagem}%` }}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div`
  ${tw`
    block
  `}
`;

type Props = {
  item: number;
  total: number;
};
