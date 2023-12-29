import axios from "axios";
import fs from "fs";
import { ethers, BigNumber } from "ethers";

async function main() {

    const accounts = [
        "0xd9c66fc2b01Bb6d72e8884d2AA1e2DDA2995ecD6",
        "0x83f0a8EBCAEBEDec334e57499A78e1Eb080a0444",
        "0x5B33f09F3c4A9393ff4eB83ac3eE7fD6FA296053",
        "0x0398261489D24DCc6d87c5754212bB857D7b09ae",
        "0xB76F95bB816c8aEDB525D7c82Eb50835eea5E416",
        "0xd2eB6Fd47811734e06a15b062239bED75c414Aa4",
        "0xa50f89381301Decb11F1918586f98c5f2077e3Ca",
        "0x150be62edDDD543452545e502bCAF6800BcAF2D6",
        "0x7529Ea854069b2671a947c3d405327F5dB0ce225",
        "0x1074045B6ee28F705c75fe8FFf21A15AF76d4d13",
        "0x1b75c6DC2C2cff9E6eAF54c5d72b3447740f1e76",
        "0x2b485b86c843332A2aBFD553D5fe7485CeE0348c",
        "0x2c3b69c7BB725EC5FeeceD00e9b2a1A6A027BF9D",
        "0xC1F562c56B4cf3B0627174649637FC6A3843B4ea",
        "0x2eA91d600364d77053CA0161424298bE6B0379aA",
        "0x31b1E645C21B2E568EB3F74a6307b03fAdb648be",
        "0xdB74ECBDb65ab15d2d68356Fe64444caec383C45",
        "0x55dC465570093bB55fca231806A0104CEA5Ee7D6",
        "0xc08dE9d8834B3ee012D684dB239bF7868c818327",
        "0x923f574Fe41DdA91D0260f1A155076Bc8B1508E1",
        "0x44abbECE7D43267f92e3861Fbc4cE61269dA678c",
        "0x431Afa20fB57C208e50cD0616e17845d6bD887f7",
        "0x0d9902306441692fB0DE59AF6C967aE0c65d6ba8",
        "0xd7b4242b86d6eE9FC50782a357E95707AF17d8c5",
        "0xffc95714864C3060B16D22dCd7A83403a58326e4",
        "0x1CBbCeE386c72577aE791A4244551Ef49f84c45b",
        "0x06b85131c117d5895553139c7aad97c3d1a7988c",
        "0xB791904D2Aa9337Bf5ac99B95bFAbD71917a643c",
        "0x309D3522F7C3a4fe6AC6bb8A2f3916d24C643DF7",
        "0x8279Fb3D46b46eF73373Bdf65Ce15Ab8BD60D7dB",
        "0x408505ec4bb812b9b649a653390a7b683cea3d54",
        "0x6F87bEF18baf73Dc1d4cF0CC3355E92D2898Fd39",
        "0xd87f8ED679d3C3176c0Ac1c34B92f6BA1F78e8D6",
        "0x69CB2cE712A6fF3F4479B144784505BdAEB23f0f",
        "0x5087c6d8b1ca2200b29E6CE481b48dA2Fd06e0B5",
        "0x309D3522F7C3a4fe6AC6bb8A2f3916d24C643DF7",
        "0xd5531e0cd49476C8959e5dfB4487dAD09DC4ba92",
        "0x2Bc2390c826aE5a86fb0E2Cb88EB15344A6F3183",
        "0x505Ffa6194f6e443b86F2028b2a97A588c17b962",
        "0x7d4A9ed68C56f23925D814699ceFaa7afFe49080",
        "0x28AB1d256047d860613688081f563165cC312853",
        "0xa6ed26749Cb54591291B4550a82f15FF64ae98D9",
        "0xF5960b58f873598674DAEda98D56724c3aE6E5DA",
        "0xC9209188cc9f3bbB9997C95b48A1D1349131Ee84",
        "0x25330F55C6e8c3242b180F0f150762b9435F3aed",
        "0x86d94A6DC215991127c36f9420F30C44b5d8CbaD",
        "0xc927e121c29037136aDAb44539c95d922940E2DF",
        "0x1a3f00A013670BEcaF3E51B5DB8c0A530B5Bf08f",
        "0x835c0E46cb45180E9ec9b31A3e3F13B2F486aDfB",
        "0x5248f49d9278533Fc4ABcafb84366f9AF2F8A742",
        "0x3865671EAD37172a1F8718C0a2fa375fb78e5719",
        "0xE28e83E14F58015A87dA6E243794063c2123E78b",
        "0x005eC612E764Eb5Dac801321C2D48a95eBd0D852",
        "0xd81fa0603CBbf7fDeDD3a449c3a278AF00f70b8E",
        "0x5a84F9B2945ee902de416d08Af6d380C7c58Ad65",
        "0x59184a5f27de55b84DbEd584A7eB930F8b7152AE",
        "0x0c477275713ba9f5C6d30acb1741979C16766146",
    ];

    const output = [];
    let totalEstimatedAmount = BigNumber.from(0);

    for (let i = 0; i < accounts.length; i++) {
        const queryURL = "https://api.thegraph.com/subgraphs/name/noveleader/fxdx-distributor";

        const query = `{
            vestingDatas(where: { account: "${accounts[i].toLowerCase()}"}) {
                vestingAmounts
                claimedAmount
                vestingDuration
                account
                claimableAmount
                cumulativeClaimAmount
                id
                lastClaimedAt
                vestingCancelled
            }
        }`;

        const res = await axios.post(queryURL, { query });

        const { account, vestingAmounts, vestingDuration, claimedAmount } = res.data.data.vestingDatas[0];

        // console.log(vestingAmounts, vestingDuration);


        const estimatedAmount = BigNumber.from(vestingAmounts).div(BigNumber.from(vestingDuration)).mul(BigNumber.from(30 * 24 * 60 * 60 * 3)).sub(BigNumber.from(claimedAmount)).toString();

        // console.log(estimatedAmount.toString())

        console.log(`Account: ${account}  |  Claimed Amount: ${claimedAmount}  |  Claimable Amount: ${estimatedAmount}`);

        totalEstimatedAmount = totalEstimatedAmount.add(estimatedAmount)
        output.push({
            account, claimedAmount, estimatedAmount
        });
    }

    const filename = `./distribution-data.json`
    fs.writeFileSync(filename, JSON.stringify(output, null, 4))
    console.log("Data saved to: %s", filename)

    console.log(`Total Estimated: ${totalEstimatedAmount}`);
}

main();