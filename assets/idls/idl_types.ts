/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/voting_program.json`.
 */
export type VotingProgram = {
  address: 'HnVat5syJwbkEok6x5N3FJnevY8jRpvSNeXVZF8VKjMp';
  metadata: {
    name: 'votingProgram';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'initialize';
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: 'poll';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'arg';
                path: 'pollId';
              }
            ];
          };
        },
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'pollId';
          type: 'i64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'poll';
      discriminator: [110, 234, 167, 188, 231, 136, 153, 111];
    }
  ];
  types: [
    {
      name: 'poll';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'pollId';
            type: 'i64';
          },
          {
            name: 'candicatorsAmount';
            type: 'u64';
          },
          {
            name: 'startTime';
            type: 'i64';
          },
          {
            name: 'endTime';
            type: 'i64';
          },
          {
            name: 'description';
            type: 'string';
          }
        ];
      };
    }
  ];
};
