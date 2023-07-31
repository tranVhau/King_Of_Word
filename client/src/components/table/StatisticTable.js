import React, { memo } from "react";
import TrueIcon from "../../../public/assets/svgs/true.svg";
import FalseIcon from "../../../public/assets/svgs/false.svg";

const StatisticTable = memo(function StatisticTable({
  myResult,
  opponentResult,
}) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table>
              <tbody>
                <tr>
                  <th scope="col" className="text-left px-6 py-4">
                    Questions
                  </th>
                  <td scope="col" className="px-6 py-4">
                    1
                  </td>
                  <td scope="col" className="px-6 py-4">
                    2
                  </td>
                  <td scope="col" className="px-6 py-4">
                    3
                  </td>
                  <td scope="col" className="px-6 py-4">
                    4
                  </td>
                  <td scope="col" className="px-6 py-4">
                    5
                  </td>
                </tr>

                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50  ">
                  <th className="text-left whitespace-nowrap px-6 py-4 font-medium ">
                    Your answer
                  </th>
                  {myResult?.map((result, index) => {
                    if (result?.answer == result?.correctAnswer) {
                      return (
                        <td key={index} className="whitespace-nowrap px-6 py-4">
                          <TrueIcon className="w-4 h-4 fill-green-500" />
                        </td>
                      );
                    } else {
                      return (
                        <td key={index} className="whitespace-nowrap px-6 py-4">
                          <FalseIcon className="w-4 h-4 fill-red-500" />
                        </td>
                      );
                    }
                  })}
                </tr>
                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50  ">
                  <th className="text-left whitespace-nowrap px-6 py-4 font-medium">
                    Opponent answer
                  </th>
                  {opponentResult?.map((result, index) => {
                    if (result?.answer == result?.correctAnswer) {
                      return (
                        <td key={index} className="whitespace-nowrap px-6 py-4">
                          <TrueIcon className="w-4 h-4 fill-green-500" />
                        </td>
                      );
                    } else {
                      return (
                        <td key={index} className="whitespace-nowrap px-6 py-4">
                          <FalseIcon className="w-4 h-4 fill-red-500" />
                        </td>
                      );
                    }
                  })}
                </tr>
                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50  ">
                  <th className="text-left whitespace-nowrap px-6 py-4 font-medium">
                    Your time
                  </th>
                  {myResult?.map((result, index) => {
                    return (
                      <td key={index} className="whitespace-nowrap px-6 py-4">
                        {`${result?.duration ? result.duration + "s" : "_"}`}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50  ">
                  <th className="text-left whitespace-nowrap px-6 py-4 font-medium">
                    Opponent time
                  </th>
                  {opponentResult?.map((result, index) => {
                    return (
                      <td key={index} className="whitespace-nowrap px-6 py-4">
                        {`${result?.duration ? result.duration + "s" : "_"}`}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50  ">
                  <th className="text-left whitespace-nowrap px-6 py-4 font-medium">
                    Scored
                  </th>
                  {myResult?.map((result, index) => {
                    return (
                      <td key={index} className="whitespace-nowrap px-6 py-4">
                        {result.scored}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StatisticTable;
