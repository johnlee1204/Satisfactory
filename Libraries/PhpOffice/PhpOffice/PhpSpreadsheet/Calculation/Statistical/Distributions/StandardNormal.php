<?php

namespace PhpOffice\PhpSpreadsheet\Calculation\Statistical\Distributions;

use PhpOffice\PhpSpreadsheet\Calculation\Functions;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical\Averages;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical\StandardDeviations;

class StandardNormal
{
    /**
     * NORMSDIST.
     *
     * Returns the standard normal cumulative distribution function. The distribution has
     * a mean of 0 (zero) and a standard deviation of one. Use this function in place of a
     * table of standard normal curve areas.
     *
     * @param mixed (float) $value
     *
     * @return float|string The result, or a string containing an error
     */
    public static function cumulative($value)
    {
        return Normal::distribution($value, 0, 1, true);
    }

    /**
     * NORM.S.DIST.
     *
     * Returns the standard normal cumulative distribution function. The distribution has
     * a mean of 0 (zero) and a standard deviation of one. Use this function in place of a
     * table of standard normal curve areas.
     *
     * @param mixed (float) $value
     * @param mixed (bool) $cumulative
     *
     * @return float|string The result, or a string containing an error
     */
    public static function distribution($value, $cumulative)
    {
        return Normal::distribution($value, 0, 1, $cumulative);
    }

    /**
     * NORMSINV.
     *
     * Returns the inverse of the standard normal cumulative distribution
     *
     * @param mixed (float) $value
     *
     * @return float|string The result, or a string containing an error
     */
    public static function inverse($value)
    {
        return Normal::inverse($value, 0, 1);
    }

    /**
     * ZTEST.
     *
     * Returns the one-tailed P-value of a z-test.
     *
     * For a given hypothesized population mean, x, Z.TEST returns the probability that the sample mean would be
     *     greater than the average of observations in the data set (array) — that is, the observed sample mean.
     *
     * @param mixed (float) $dataSet
     * @param mixed (float) $m0 Alpha Parameter
     * @param mixed (null|float) $sigma Beta Parameter
     *
     * @return float|string (string if result is an error)
     */
    public static function zTest($dataSet, $m0, $sigma = null)
    {
        $dataSet = Functions::flattenArrayIndexed($dataSet);
        $m0 = Functions::flattenSingleValue($m0);
        $sigma = Functions::flattenSingleValue($sigma);

        if (!is_numeric($m0) || ($sigma !== null && !is_numeric($sigma))) {
            return Functions::VALUE();
        }

        if ($sigma === null) {
            $sigma = StandardDeviations::STDEV($dataSet);
        }
        $n = count($dataSet);

        return 1 - self::cumulative((Averages::average($dataSet) - $m0) / ($sigma / sqrt($n)));
    }
}
